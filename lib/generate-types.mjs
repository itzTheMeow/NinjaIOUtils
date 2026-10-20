/**
 * NinjaIOUtils lib typings generator.
 *
 * Reads lib/latest.js (the bundled site script from ninja.io), slices out the
 * vendored third-party bundles (pixi.js, howler, ismobilejs, Flatbush, LZString,
 * Box2D, ...), pins the detected vendor versions as lib devDependencies and
 * runs tsc over the remaining game code to produce lib/lib.d.ts.
 *
 * Usage: bun run types   (or: bun generate-types.mjs)   from the lib/ directory
 * Flags: --no-install  skip bun install after version bump
 *        --no-validate skip the userscript tsc --noEmit validation
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync, spawnSync } from "node:child_process";
import * as acorn from "acorn";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SOURCE = path.join(HERE, "latest.js");
const OUT_FILE = path.join(HERE, "lib.d.ts");
const WORK = path.join(HERE, ".generate");
const USERSRIPT_DIR = path.join(HERE, "..", "userscript");

const NO_INSTALL = process.argv.includes("--no-install");
const NO_VALIDATE = process.argv.includes("--no-validate");

/** Vendor bundle signatures. Applied to each top-level statement's source text
 *  (incl. its leading comments). Statements that merely REFERENCE these names
 *  (Box2D physics bindings, LZString compression helpers in game classes) also
 *  match - so classification must be structural, not marker-based: the vendor
 *  bundles always form a contiguous prefix, and the pixi.js UMD is its last
 *  statement (game code extends PIXI, so pixi cannot be a suffix).
 *  `Vendor block = statements [0 .. pixiStatement]`. */
const VENDOR_MARKERS = [
  /PixiJS - v[\d.]+/, // pixi.js banner comment
  /howler\.js v[\d.]+/i, // howler banner comment
  /\bFlatbush\b/, // flatbush UMD
  /\bLZString\b/, // lz-string
  /\bMobileDetect\b/, // ismobilejs
  /\bBox2D\b/, // box2d physics
  /angular\.module\(/,
];

/** Typed package versions are detected from the bundle banners. */
const VERSION_DETECTORS = [
  {
    package: "pixi.js",
    regex: /PixiJS - v(\d+\.\d+\.\d+)/,
    ask: (match) => match[1],
  },
  {
    package: "@types/howler",
    regex: /howler\.js v(\d+)\.(\d+)\.(\d+)/i,
    ask: (match) => `^${match[1]}.${match[2]}`,
  },
];

/** Globals the game code assigns at top level without declaring them are
 *  converted to `var X = ...` (see rewriteGlobals). MEMBER_FOLD_NAMES limits
 *  the Object.assign member-folding transform to the subset where userscript
 *  code relies on per-member types. */
const MEMBER_FOLD_NAMES = ["FontStyle"];

/** pixi.js names that userscript sources import directly; re-exported from
 *  lib.d.ts so the userscript needs no pixi dependency of its own. */
const PIXI_REEXPORT_TYPES = ["TextStyle", "TextStyleOptions"];
const PIXI_REEXPORT_VALUES = ["Text"];

function fail(message) {
  console.error(`\n[generate-types] ${message}`);
  process.exit(1);
}

/* ------------------------------------------------------------------ */
/* 1. slice                                                            */
/* ------------------------------------------------------------------ */

function parse(source) {
  const comments = [];
  const program = acorn.parse(source, {
    ecmaVersion: "latest",
    allowReturnOutsideFunction: true,
    allowAwaitOutsideFunction: true,
    allowHashBang: true,
    onComment: (block, text, start, end) => comments.push({ start, end, text }),
  });
  return { program, comments };
}

function extract(source) {
  const { program, comments } = parse(source);
  const body = program.body;
  const statements = body.map((statement, index) => {
    const prevEnd = index === 0 ? 0 : body[index - 1].end;
    // leading comments: those that end before this statement and start after
    // the previous statement (or file start for the first one)
    let leadStart = statement.start;
    for (const comment of comments) {
      if (comment.end > statement.start) break;
      if (comment.start >= prevEnd && comment.start < leadStart)
        leadStart = comment.start;
    }
    return {
      node: statement,
      start: statement.start,
      end: statement.end,
      leadStart,
    };
  });
  return { statements, comments };
}

function classify(statements, source) {
  // game code extends PIXI.Container, so the pixi.js UMD is always the LAST
  // vendor statement: the vendor block is its contiguous prefix.
  const pixiIndex = statements.findIndex((statement) =>
    /PixiJS - v[\d.]+/.test(source.slice(statement.leadStart, statement.end)),
  );
  if (pixiIndex < 0)
    fail(
      "pixi bundle statement not found in latest.js (`PixiJS - v<version>` banner missing) - bundle structure changed",
    );
  return { gameFrom: pixiIndex + 1, pixiIndex: pixiIndex };
}

/* ------------------------------------------------------------------ */
/* 2. applied AST transforms on the game chunk                         */
/* ------------------------------------------------------------------ */

function collectGameNames(gameNodes, source) {
  const declared = new Set();
  for (const statement of gameNodes) {
    const { node } = statement;
    if (node.type === "ClassDeclaration" && node.id) declared.add(node.id.name);
    else if (node.type === "FunctionDeclaration" && node.id)
      declared.add(node.id.name);
    else if (node.type === "VariableDeclaration")
      for (const declaration of node.declarations)
        collectPattern(declaration.id, declared);
    // import/export statements are wrapped by the generator, ignore here
  }
  return declared;
}

function collectPattern(pattern, out) {
  if (pattern.type === "Identifier") out.add(pattern.name);
  else if (pattern.type === "ObjectPattern")
    for (const property of pattern.properties)
      collectPattern(property.value ?? property.argument, out);
  else if (pattern.type === "ArrayPattern")
    for (const element of pattern.elements)
      if (element) collectPattern(element, out);
      else if (
        pattern.type === "AssignmentPattern" ||
        pattern.type === "RestElement"
      )
        collectPattern(pattern.argument ?? pattern.left, out);
}

/** Plain mixin-style constructor functions (pattern: `function X() { this.foo =
 *  ...; }` used via `X.call(this)`) are not inferable as classes, but the
 *  userscript uses them as types and `new X()`. These names are rewritten to
 *  `class X { constructor() { ... } }` before emit - the runtime behavior is
 *  untouched (typing only), while tsc gets constructor field inference. */
const CLASSIFY_AS_CLASS = ["EventDispatcher"];

/** Globals the game code mixes in with EventDispatcher.call(obj) (e.g.
 *  UserInput). Their `var X = { ... }` initializers are rewritten to
 *  `Object.assign(new EventDispatcher(), { ...members })` and the separate
 *  `.call(...)` statements are dropped, so consumers get EventDispatcher API
 *  plus all later-assigned constants (UserInput.WHEEL etc.) in the type. */
const DISPATCHER_MIXIN_NAMES = ["UserInput"];

/** Runtime fields the userscript attaches itself, or pixi/type conflicts we
 *  deliberately loosen. Tuned per generated run; members that genuinely moved
 *  in the bundle should NOT be faked here (port the consumer instead). */
const MEMBER_OVERRIDES = [
  { class: "Client", member: "mapID", type: "any" }, // userscript-attached on runtime instances
  { class: "PVPClient", member: "mapID", type: "any" },
  { class: "App", member: "credential", type: "any" }, // auth payload shape varies at runtime
  { class: "App", member: "CombinedTextures", type: "any", static: true },
  { class: "App", member: "ConnectedServer", type: "any", static: true },
  { class: "Checkbox", member: "label", type: "any" }, // shadows PIXI.Container.label
];

/** Bare `X = <expr>;` assignments to undeclared top-level names are declared
 *  (`var X = ...`) so tsc exports them with inferred types. Globals in
 *  MEMBER_FOLD_NAMES additionally get their later per-member assignments
 *  (e.g. `FontStyle.LargeDefault = new %Style({...})`) folded into the
 *  initializer as `Object.assign(<init>, { member: <expr>, ... })` - TS cannot
 *  infer members assigned onto a class instance afterwards, and the member set
 *  is discovered from the AST each run, adapting to site updates.
 *
 *  All statement offsets are absolute (into the unmodified source); the chunk
 *  is rebuilt exactly once, so no offset bookkeeping can drift. */
function rewriteGlobals(gameChunk, gameNodes, declaredNames, baseOffset) {
  const bareAssignStatement = (node) =>
    node?.type === "ExpressionStatement" &&
    node.expression?.type === "AssignmentExpression" &&
    node.expression.operator === "=" &&
    node.expression.left?.type === "Identifier";

  const bareAssignments = new Map(); // name -> { start, end, exprStart, exprEnd }
  const declaratorInits = new Map(); // name -> { start, end } (initializer span)
  for (const { node } of gameNodes) {
    if (node?.type === "VariableDeclaration") {
      for (const declaration of node.declarations) {
        if (declaration.id?.type === "Identifier" && declaration.init)
          declaratorInits.set(declaration.id.name, {
            start: declaration.init.start - baseOffset,
            end: declaration.init.end - baseOffset,
          });
      }
    }
    if (!bareAssignStatement(node)) continue;
    const name = node.expression.left.name;
    if (declaredNames.has(name)) continue;
    bareAssignments.set(name, {
      start: node.start - baseOffset,
      end: node.end - baseOffset,
      exprStart: node.expression.right.start - baseOffset,
      exprEnd: node.expression.right.end - baseOffset,
    });
  }

  // mixin constructor functions -> class syntax (see CLASSIFY_AS_CLASS)
  const classRewrites = new Map(); // name -> { start, end, replacement }
  for (const { node } of gameNodes) {
    if (node?.type !== "FunctionDeclaration" || !node.id) continue;
    if (!CLASSIFY_AS_CLASS.includes(node.id.name)) continue;
    const statementStart = node.start - baseOffset;
    const statementEnd = node.end - baseOffset;
    const text = gameChunk.slice(statementStart, statementEnd);
    const match = text.match(/^function\s+[A-Za-z_$][\w$]*/);
    if (!match) continue;
    // `function X(params) { body }` -> `class X { constructor(params) { body } }`
    // feature check: body assigns at least one `this.<prop> =` (mixin pattern)
    const assignsInstanceProps = node.body.body.some(
      (statement) =>
        statement?.type === "ExpressionStatement" &&
        statement.expression?.type === "AssignmentExpression" &&
        statement.expression.left?.type === "MemberExpression" &&
        !statement.expression.left.computed &&
        statement.expression.left.object?.type === "ThisExpression",
    );
    if (!assignsInstanceProps) continue;
    const name = node.id.name;
    classRewrites.set(name, {
      start: statementStart,
      end: statementEnd,
      replacement: `class ${name} { constructor${text.slice(match[0].length)} }`,
    });
  }

  const memberFoldCandidates = new Set([
    ...MEMBER_FOLD_NAMES,
    ...DISPATCHER_MIXIN_NAMES,
  ]);
  const memberAssignments = new Map(); // name -> [{ start, end, key, rightStart, rightEnd }]
  for (const { node } of gameNodes) {
    if (node?.type !== "ExpressionStatement") continue;
    const expr = node.expression;
    if (expr?.type !== "AssignmentExpression" || expr.operator !== "=")
      continue;
    if (
      expr.left?.type !== "MemberExpression" ||
      expr.left.computed ||
      expr.left.object?.type !== "Identifier"
    )
      continue;
    const name = expr.left.object.name;
    if (!(bareAssignments.has(name) || memberFoldCandidates.has(name)))
      continue;
    if (expr.left.property?.type !== "Identifier") continue;
    if (!memberAssignments.has(name)) memberAssignments.set(name, []);
    memberAssignments.get(name).push({
      start: node.start - baseOffset,
      end: node.end - baseOffset,
      key: expr.left.property.name,
      rightStart: expr.right.start - baseOffset,
      rightEnd: expr.right.end - baseOffset,
    });
  }

  // EventDispatcher.call(X) mixin targets: fold their declared object
  // initializer + later member assignments into `Object.assign(new
  // EventDispatcher(), {...})` and drop the `.call(...)` statements.
  const mixinReplacements = [];
  for (const name of DISPATCHER_MIXIN_NAMES) {
    const callStatements = [];
    for (const { node } of gameNodes) {
      if (node?.type !== "ExpressionStatement") continue;
      const call = node.expression;
      if (
        call?.type === "CallExpression" &&
        call.callee?.type === "MemberExpression" &&
        !call.callee.computed &&
        call.callee.property?.name === "call" &&
        CLASSIFY_AS_CLASS.includes(call.callee.object?.name) &&
        call.arguments?.[0]?.type === "Identifier" &&
        call.arguments[0].name === name
      )
        callStatements.push({
          start: node.start - baseOffset,
          end: node.end - baseOffset,
        });
    }
    if (callStatements.length === 0) continue;
    const members = memberAssignments.get(name) ?? [];
    const memberText = members
      .map(
        (member) =>
          `${member.key}: ${gameChunk.slice(member.rightStart, member.rightEnd).trim()}`,
      )
      .join(", ");
    for (const [declaratorName, init] of declaratorInits) {
      if (declaratorName !== name) continue;
      const initText = gameChunk.slice(init.start, init.end).trim();
      // splice member assignments into the object literal: drop the literal's
      // closing brace, strip any dangling trailing comma/whitespace, then
      // append the member assignments before re-closing
      const outerClose = initText.lastIndexOf("}");
      if (outerClose < 0) continue;
      const literalBase = initText
        .slice(0, outerClose)
        .trimEnd()
        .replace(/,$/, "")
        .trimEnd();
      const literal = `${literalBase}${memberText ? `, ${memberText}` : ``} }`;
      mixinReplacements.push({
        start: init.start,
        end: init.end,
        replacement: `Object.assign(new EventDispatcher(), ${literal})`,
      });
      for (const member of members)
        mixinReplacements.push({
          start: member.start,
          end: member.end,
          replacement: "",
        });
      for (const callStatement of callStatements)
        mixinReplacements.push({
          start: callStatement.start,
          end: callStatement.end,
          replacement: "",
        });
      console.log(
        `folded ${name} object initializer + ${members.length} member assignment(s) with EventDispatcher.call`,
      );
    }
  }

  const replacements = []; // [{ start, end, replacement }]
  for (const [name, assignment] of bareAssignments) {
    const initText = gameChunk
      .slice(assignment.exprStart, assignment.exprEnd)
      .trim();
    const members = memberAssignments.get(name);
    if (members?.length) {
      const assignments = members
        .map(
          (member) =>
            `${member.key}: ${gameChunk.slice(member.rightStart, member.rightEnd).trim()}`,
        )
        .join(", ");
      replacements.push({
        start: assignment.start,
        end: assignment.end,
        replacement: `var ${name} = Object.assign(${initText}, { ${assignments} });`,
      });
      for (const member of members)
        replacements.push({
          start: member.start,
          end: member.end,
          replacement: "",
        });
      console.log(
        `folded ${members.length} member assignment(s) into ${name} initializer`,
      );
    } else {
      replacements.push({
        start: assignment.start,
        end: assignment.end,
        replacement: `var ${name} = ${initText};`,
      });
    }
  }

  let result = "";
  let cursor = 0;
  const spans = [
    ...classRewrites.values(),
    ...replacements,
    ...mixinReplacements,
  ].sort((a, b) => a.start - b.start);
  for (const span of spans) {
    result += gameChunk.slice(cursor, span.start) + span.replacement;
    cursor = span.end;
  }
  result += gameChunk.slice(cursor);
  return { rewrittenChunk: result, converted: [...bareAssignments.keys()] };
}

/* ------------------------------------------------------------------ */
/* 2b. optional params + mixin classes                                 */
/* ------------------------------------------------------------------ */

function optionalizeParams(gameChunk) {
  const program = acorn.parse(gameChunk, {
    ecmaVersion: "latest",
    sourceType: "module",
  });
  const spans = [];
  const functions = []; // { anchorStart, params, optionalized: Set, docInfo }
  const collect = (node) => {
    if (!node || typeof node !== "object") return;
    let isFunction = false;
    let anchor;
    if (
      node.type === "FunctionDeclaration" ||
      node.type === "FunctionExpression" ||
      node.type === "ArrowFunctionExpression"
    ) {
      isFunction = true;
      anchor = node.start;
    } else if (node.type === "MethodDefinition" && node.value) {
      isFunction = true;
      anchor = node.start; // doc must precede the member, not the function value
    }
    if (isFunction)
      functions.push({
        anchorStart: anchor,
        params: node.params,
        optionalized: [],
      });
    for (const key of Object.keys(node)) {
      const value = node[key];
      if (Array.isArray(value)) value.forEach(collect);
      else if (value && typeof value === "object" && value.type) collect(value);
    }
  };
  for (const statement of program.body) collect(statement, undefined);

  // Reverse walk per function. A `= null` on param[ix] only type-checks when
  // every param after it is already optional, so we add defaults from the END
  // backwards and stop at: a non-identifier pattern, a param that already has
  // a default (it anchors the optional chain), or the very first param (call
  // sites must always supply it in the bundle). Legacy arities stay callable
  // exactly like the runtime tolerates (e.g. Button.setText(a, b, c) called
  // as setText("Delete") - b/c are `||`-guarded in the body).
  for (const fn of functions) {
    const params = fn.params ?? [];
    if (params.length === 0) continue;
    for (let index = params.length - 1; index > 0; index--) {
      const param = params[index];
      if (param.type !== "Identifier") break;
      if (param.left !== undefined) break; // already has a default
      fn.optionalized.push(param.name);
      spans.push({
        start: param.start,
        end: param.end,
        replacement: `${param.name} = null`,
      });
    }
  }
  // The default `= null` types the param as literally `null`; a JSDoc header
  // restores `any` (JS files cannot annotate). Doc lists every param, optional
  // ones wrapped in JSDoc's bracket notation.
  for (const fn of functions) {
    if (fn.optionalized.length === 0 || fn.anchorStart === undefined) continue;
    const optionalNames = new Set(fn.optionalized);
    const paramNames = fn.params
      .filter((param) => param.type === "Identifier")
      .map((param) =>
        optionalNames.has(param.name)
          ? `{any} [${param.name}]`
          : `{any} ${param.name}`,
      );
    if (paramNames.length === 0) continue;
    spans.push({
      start: fn.anchorStart,
      end: fn.anchorStart,
      replacement: `${paramNames.map((p) => `@param ${p}`).join(" ") ? `/** ${paramNames.map((p) => `@param ${p}`).join(" ")} */` : ""} `,
    });
  }

  const deduped = [];
  for (const span of spans.sort((a, b) => a.start - b.start))
    if (!deduped.length || deduped[deduped.length - 1].start < span.start)
      deduped.push(span);
  console.log(
    `optionalize: ${functions.length} functions scanned, ${deduped.length} spans (params + docs) emitted`,
  );
  return applySpans(gameChunk, deduped);
}

/** Classes whose constructor seeds `EventDispatcher.call(this)` genuinely carry
 *  the dispatcher API at runtime; rewriting them to `extends EventDispatcher`
 *  puts addListener/removeListener/dispatchEvent on their types (type-level
 *  only: this file is never executed). */
function classifyMixinClasses(gameChunk) {
  const program = acorn.parse(gameChunk, {
    ecmaVersion: "latest",
    sourceType: "module",
  });
  const spans = [];
  for (const statement of program.body) {
    if (
      statement?.type !== "ClassDeclaration" ||
      statement.superClass ||
      !statement.id ||
      !statement.body
    )
      continue;
    const constructorMethod = statement.body.body.find(
      (member) =>
        member?.type === "MethodDefinition" && member.kind === "constructor",
    );
    const bodyStatements = constructorMethod?.value?.body?.body;
    if (!bodyStatements) continue;
    const mixinCall = bodyStatements.some(
      (inner) =>
        inner?.type === "ExpressionStatement" &&
        inner.expression?.type === "CallExpression" &&
        inner.expression.callee?.type === "MemberExpression" &&
        !inner.expression.callee.computed &&
        inner.expression.callee.property?.name === "call" &&
        CLASSIFY_AS_CLASS.includes(inner.expression.callee.object?.name),
    );
    if (!mixinCall) continue;
    const nameEnd = statement.id.end;
    spans.push({
      start: nameEnd,
      end: statement.body.start,
      replacement: ` extends EventDispatcher `,
    });
    console.log(`mixin: class ${statement.id.name} extends EventDispatcher`);
  }
  return applySpans(gameChunk, spans);
}

/** shared span-applier: spans must be non-overlapping, [start, end) absolute in
 *  `chunk`. */
function applySpans(chunk, spans) {
  if (spans.length === 0) return chunk;
  let result = "";
  let cursor = 0;
  for (const span of spans.sort((a, b) => a.start - b.start)) {
    if (span.start < cursor) continue;
    result += chunk.slice(cursor, span.start) + span.replacement;
    cursor = span.end;
  }
  result += chunk.slice(cursor);
  return result;
}

/* ------------------------------------------------------------------ */
/* 3. version detection + package management (bun)                     */
/* ------------------------------------------------------------------ */

function detectVersions(source) {
  const detected = [];
  for (const detector of VERSION_DETECTORS) {
    const match = source.match(detector.regex);
    if (!match)
      fail(
        `vendor banner for "${detector.package}" not found in latest.js - bundle changed, update VERSION_DETECTORS`,
      );
    detected.push({ detector, wanted: detector.ask(match) });
    console.log(`detected ${detector.package} -> ${detector.ask(match)}`);
  }
  return detected;
}

function syncPackageVersions(detected) {
  const packageJsonPath = path.join(HERE, "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  const devDependencies = packageJson.devDependencies ?? {};
  let changed = false;
  for (const { detector, wanted } of detected) {
    if (devDependencies[detector.package] !== wanted) {
      devDependencies[detector.package] = wanted;
      console.log(`bumping devDependency ${detector.package} -> ${wanted}`);
      changed = true;
    }
  }
  if (changed) {
    packageJson.devDependencies = devDependencies;
    fs.writeFileSync(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2) + "\n",
    );
    if (!NO_INSTALL) {
      console.log("running bun install...");
      execFileSync("bun", ["install"], { cwd: HERE, stdio: "inherit" });
    } else
      console.log("--no-install: skipped bun install, remember to run it!");
  }
  return changed;
}

/* ------------------------------------------------------------------ */
/* 4. emit                                                             */
/* ------------------------------------------------------------------ */

function buildGameTs(gameChunk, convertedNames) {
  const header = [
    `import * as PIXI from "pixi.js";`,
    `import { Howl, Howler } from "howler";`,
    ``,
  ].join("\n");

  // everything the userscript imports from "lib" must be exported; the whole
  // game chunk is one module, so list all top-level declared names.
  let program;
  try {
    program = acorn.parse(gameChunk, {
      ecmaVersion: "latest",
      sourceType: "module",
    });
  } catch (error) {
    const lines = gameChunk.split("\n");
    try {
      fs.writeFileSync(path.join(WORK, "game.failed.js"), gameChunk);
    } catch {}
    console.error(error.message);
    const line = error.loc?.line ?? 0;
    for (
      let index = Math.max(0, line - 4);
      index < Math.min(lines.length, line + 2);
      index++
    )
      console.error(`${index + 1}: ${lines[index].slice(0, 200)}`);
    fail("generated game chunk failed to parse - inspect the lines above");
  }
  const names = new Set();
  for (const statement of program.body) {
    if (statement.type === "ClassDeclaration" && statement.id)
      names.add(statement.id.name);
    else if (statement.type === "FunctionDeclaration" && statement.id)
      names.add(statement.id.name);
    else if (statement.type === "VariableDeclaration")
      for (const declaration of statement.declarations)
        collectPattern(declaration.id, names);
  }
  const exports = [...names]
    .filter((name) => !["PIXI", "Howl", "Howler"].includes(name))
    .sort();
  const exportBlock = `export { ${exports.join(", ")} };`;
  const pixiExports = [
    `export * as PIXI from "pixi.js";`,
    PIXI_REEXPORT_TYPES.length
      ? `export { ${PIXI_REEXPORT_TYPES.join(", ")} } from "pixi.js";`
      : "",
    PIXI_REEXPORT_VALUES.length
      ? `export { ${PIXI_REEXPORT_VALUES.join(", ")} } from "pixi.js";`
      : "",
  ]
    .filter(Boolean)
    .join("\n");

  console.log(
    `exporting ${exports.length} top-level names from the game chunk`,
  );
  return `${header}${gameChunk}\n\n${exportBlock}\n${pixiExports}\n`;
}

/* The game chunk is compiled as a .js file (allowJs, checkJs false): that is
 * what enables tsc's declaration inference - constructor field inference,
 * `X.prototype.m = ...` style class bodies and `Class.static = ...` namespace
 * merging. Compiling as .ts would type-check 5.4MB of unpacked JS and lose
 * most of those inferences. */

function runTsc() {
  const tsconfigOut = {
    compilerOptions: {
      target: "ES2022",
      lib: ["ESNext", "DOM", "DOM.Iterable"],
      module: "ESNext",
      moduleResolution: "bundler",
      skipLibCheck: true,
      allowJs: true,
      checkJs: false,
      declaration: true,
      emitDeclarationOnly: true,
    },
    files: ["game.js", "../externals.d.ts"],
  };
  fs.writeFileSync(
    path.join(WORK, "tsconfig.json"),
    JSON.stringify(tsconfigOut, null, 2),
  );
  const tsc = path.join(HERE, "node_modules", ".bin", "tsc");
  const result = spawnSync(tsc, ["-p", "tsconfig.json"], {
    cwd: WORK,
    encoding: "utf8",
  });
  const output = `${result.stdout ?? ""}${result.stderr ?? ""}`.trim();
  return { status: result.status, output };
}

/* ------------------------------------------------------------------ */
/* 5. post-emit member overrides                                       */
/* ------------------------------------------------------------------ */

function applyMemberOverrides(dts) {
  // Our injected `= null` defaults infer the param type as literally `null`;
  // the runtime accepts anything, so widen them back to any. (These are the
  // ONLY bare `?: null` params in the emit - game natural unions are `... | null`.)
  const before = dts;
  dts = dts.replace(/([A-Za-z_$][\w$]*)\?: null\b/g, "$1?: any");
  console.log(
    `optionalize: widened ${before.length ? (before.match(/([A-Za-z_$][\w$]*)\?: null\b/g) ?? []).length : 0} inferred-null param types`,
  );
  const findBlock = (heading, text) => {
    const blockStart = text.indexOf(heading);
    if (blockStart < 0) return null;
    const openBrace = text.indexOf("{", blockStart);
    let depth = 0;
    for (let index = openBrace; index < text.length; index++) {
      if (text[index] === "{") depth++;
      else if (text[index] === "}") {
        depth--;
        if (depth === 0) return { start: openBrace, end: index };
      }
    }
    return null;
  };

  for (const {
    class: className,
    member,
    type,
    static: isStatic,
  } of MEMBER_OVERRIDES) {
    if (isStatic) {
      // statics must be reachable through `typeof App`; if the emit's namespace
      // for the class already declares the member, retarget THAT declaration's
      // type. Otherwise put a `static member` on the class declaration itself
      // (an un-exported module namespace merge doesn't surface new members for
      // consumers, but class statics do).
      const namespacePattern = new RegExp(
        `(export\\s+var ${member}:\\s*)[^;]+;`,
      );
      const namespaceMatch = dts.match(namespacePattern);
      if (namespaceMatch) {
        dts = dts.replace(namespacePattern, `$1${type};`);
        console.log(
          `override: retyped static ${className}.${member} (namespace) -> ${type}`,
        );
        continue;
      }
      const block = findBlock(`declare class ${className} `, dts);
      if (!block) {
        console.log(
          `override: class ${className} not found, skipping static ${member}`,
        );
        continue;
      }
      const body = dts.slice(block.start + 1, block.end);
      const staticPattern = new RegExp(
        `(\\n    (?:readonly )?static ${member}:\\s*)[^;]+;`,
      );
      let patched;
      if (staticPattern.test(body)) {
        patched = body.replace(staticPattern, `$1${type};`);
        console.log(
          `override: retyped static ${className}.${member} -> ${type}`,
        );
      } else {
        patched = body + `\n    static ${member}: ${type};`;
        console.log(
          `override: stubbed static ${className}.${member} -> ${type}`,
        );
      }
      dts = dts.slice(0, block.start + 1) + patched + dts.slice(block.end);
      continue;
    }
    const block = findBlock(`declare class ${className} `, dts);
    if (!block) {
      console.log(
        `override: block for ${className} not found, skipping ${member}`,
      );
      continue;
    }
    const body = dts.slice(block.start + 1, block.end);
    const memberPattern = new RegExp(
      `(\\n    (?:readonly )?${member}:\\s*)[^;]+;`,
    );
    let patched;
    if (memberPattern.test(body)) {
      patched = body.replace(memberPattern, `$1${type};`);
      console.log(`override: retyped ${className}.${member} -> ${type}`);
    } else {
      patched = body + `\n    ${member}: ${type};`;
      console.log(`override: stubbed ${className}.${member} -> ${type}`);
    }
    dts = dts.slice(0, block.start + 1) + patched + dts.slice(block.end);
  }
  return dts;
}

/* ------------------------------------------------------------------ */
/* 6. main                                                             */
/* ------------------------------------------------------------------ */

function main() {
  if (!fs.existsSync(SOURCE)) fail("lib/latest.js not found");
  fs.rmSync(WORK, { recursive: true, force: true });
  fs.mkdirSync(WORK, { recursive: true });

  console.log("parsing latest.js...");
  const source = fs.readFileSync(SOURCE, "utf8");
  const { statements } = extract(source);
  console.log(`${statements.length} top-level statements`);

  const { gameFrom, pixiIndex } = classify(statements, source);
  if (gameFrom >= statements.length)
    fail("no game statements found after vendor region");
  console.log(
    `vendor block: statements 0..${pixiIndex}; game region: ${gameFrom}..${statements.length - 1} (${statements.length - gameFrom} statements)`,
  );
  for (let index = 0; index <= pixiIndex; index++) {
    const statement = statements[index];
    const text = source.slice(statement.leadStart, statement.end);
    if (VENDOR_MARKERS.some((regex) => regex.test(text)))
      console.log(
        `  vendor stmt ${index}: ${text.slice(0, 80).replace(/\s+/g, " ")}`,
      );
  }
  // game statements that still match vendor markers are game-side references
  // to bundled globals (Box2D physics bindings etc.) - they stay, but shout if
  // a whole vendor-seeming IIFE slipped in.
  const gameMarkered = [];
  for (let index = gameFrom; index < statements.length; index++) {
    const text = source.slice(
      statements[index].leadStart,
      statements[index].end,
    );
    for (const regex of VENDOR_MARKERS)
      if (regex.test(text)) gameMarkered.push(index);
  }
  console.log(
    `game statements referencing bundled globals: ${gameMarkered.length ? gameMarkered.join(", ") : "none"}`,
  );

  const gameNodes = statements.slice(gameFrom);
  const gameStart = gameNodes[0].start;
  const gameEnd = gameNodes[gameNodes.length - 1].end;
  let gameChunk = source.slice(gameStart, gameEnd);

  const declaredNames = collectGameNames(gameNodes, source);
  const { rewrittenChunk, converted } = rewriteGlobals(
    gameChunk,
    gameNodes,
    declaredNames,
    gameStart,
  );
  gameChunk = classifyMixinClasses(rewrittenChunk);
  gameChunk = optionalizeParams(gameChunk);
  if (converted.length)
    console.log(`converted bare global assignments: ${converted.join(", ")}`);

  syncPackageVersions(detectVersions(source));

  fs.writeFileSync(
    path.join(WORK, "game.js"),
    buildGameTs(gameChunk, converted),
  );
  console.log("emitting declarations (tsc)...");

  const { status, output } = runTsc();
  const outFile = path.join(WORK, "game.d.ts");
  if (!fs.existsSync(outFile)) {
    console.error(output);
    fail("tsc did not emit game.d.ts");
  }
  if (output) console.log(`tsc output:\n${output.slice(0, 2000)}`);

  fs.copyFileSync(outFile, OUT_FILE);
  fs.writeFileSync(
    OUT_FILE,
    applyMemberOverrides(fs.readFileSync(OUT_FILE, "utf8")),
  );
  console.log(
    `wrote ${OUT_FILE} (${(fs.statSync(OUT_FILE).size / 1024).toFixed(0)} kB)`,
  );
  validate();
  console.log("\ndone.");
}

function validate() {
  if (NO_VALIDATE) {
    console.log("validation skipped (--no-validate)");
    return;
  }
  const tsc = path.join(HERE, "node_modules", ".bin", "tsc");
  const result = spawnSync(tsc, ["--noEmit", "-p", "."], {
    cwd: USERSRIPT_DIR,
    encoding: "utf8",
  });
  if (result.status !== 0) {
    console.error(
      `userscript tsc --noEmit FAILED:\n${result.stdout}${result.stderr}`,
    );
    fail("generated types do not compile against the userscript");
  }
  console.log("userscript tsc --noEmit passed");
}

main();
