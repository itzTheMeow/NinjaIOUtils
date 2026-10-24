# lib/ — generated typings for the ninja.io site bundle

AGENTS.md scope: **this directory only** (`lib/`). Update this file per the
clause at the bottom whenever your changes make any of this stale.

## What lives here

| Path                | Committed? | What it is                                                                                                |
| ------------------- | ---------- | --------------------------------------------------------------------------------------------------------- |
| `latest.js`         | yes        | Raw bundled site script from ninja.io. **Read-only input — never hand-edit.**                             |
| `lib.d.ts`          | yes        | Generated ambient typings. **Never hand-edit — regenerate instead.**                                      |
| `lib.d.ts.map`      | no         | Declaration map so Zed/vtsls go-to-definition lands inside the game code (gitignored, dev-only).          |
| `generate-types.ts` | yes        | The generator pipeline (TypeScript, run with bun).                                                        |
| `map-surgery.ts`    | yes        | Source-map/text-rewrite primitives used by the generator.                                                 |
| `externals.d.ts`    | yes        | Ambient shims the compiled game chunk imports (`pixi.js`, `howler`).                                      |
| `package.json`      | yes        | Generator devDeps + pinned vendor typings versions.                                                       |
| `.generate/`        | no         | Disposable work dir (game chunk copy, tsconfig, tsc emit, `linkstate.json`); wiped and rebuilt every run. |

Consumers: `userscript/tsconfig.json` maps `"lib"` → `../lib/lib.d.ts`. The
userscript must keep compiling against the emit — the generator enforces this
at the end of every run (see validate below).

## Commands

```sh
just lib            # from repo root: full regen (bun run types in lib/); does NOT format latest.js
just update         # fetch latest.js and lint/format it (nix fmt)
cd lib && bun run types            # same thing directly
cd lib && bun run typecheck        # tsc --noEmit over the two .ts scripts
```

Generator flags: `--no-install` (skip `bun install` after a version bump),
`--no-validate` (skip the userscript compile check). Scripts are plain
TypeScript executed by bun directly — no build step for the generator itself.
`bun run typecheck` must pass before committing changes to the scripts.

## Pipeline (generate-types.ts), in order

1. **Slice** — acorn-parse `latest.js`; the vendor bundles (pixi.js, howler,
   Flatbush, LZString, ismobilejs, Box2D, angular) form a contiguous prefix
   whose **last statement is always the pixi.js UMD** (game code extends PIXI,
   so pixi can never be a suffix). Everything after it is the game chunk.
   Classification is structural, not marker-based: game statements _reference_
   vendor globals (Box2D, LZString) and must not be dropped.
2. **Chunk transforms** — each text rewrite goes through `applySpans` and is
   recorded as a "pass" (char-offset span map):
   - `rewriteGlobals`: bare `X = ...` → `var X = ...`; folds later
     `FontStyle.*` member assignments into the initializer (`MEMBER_FOLD_NAMES`);
     folds `UserInput` + `EventDispatcher.call(X)` mixins into
     `Object.assign(new EventDispatcher(), ...)` (`DISPATCHER_MIXIN_NAMES`);
     rewrites mixin constructor functions (`CLASSIFY_AS_CLASS`, currently
     `EventDispatcher`) to `class X { constructor() {...} }`.
   - `foldInitializerLiterals`: for globals in `LITERAL_INIT_FOLD_NAMES`
     (currently `AudioEffects`) whose runtime members are seeded by an object
     literal assigned inside an initializer function and merged via
     `for (... of Object.entries(<ident>))` (as of the Oct 2026 bundle,
     `InitializeAudioEffects`), splices the seed literal's verbatim source
     text into the top-level initializer (`Object.assign(<init>, <seed>)`) so
     tsc can infer the full member type (`audio: Howl`, `delta`,
     `single`, ...). Type-level only — the chunk is never executed. If the
     bundle reverts to top-level member assignments the fingerprint no longer
     matches and the fold no-ops with a log.
   - `classifyMixinClasses`: classes seeding `EventDispatcher.call(this)` get
     `extends EventDispatcher`.
   - `optionalizeParams`: trailing `= null` params + JSDoc headers so legacy
     arities stay callable.
   - `collectStaticMembers` (analysis only, no text rewrite): walks the FINAL
     chunk AST for `Host.Member = ...` assignments at any depth — tsc only
     lifts top-level ones, and the bundle assigns most statics inside methods.
     Conservative typing (`new X()` → X, literals → primitives, else any).
3. **Version pinning** — banner regexes (`VERSION_DETECTORS`) extract pixi.js /
   howler versions and bump `package.json` devDeps + `bun install`.
4. **Emit** — the chunk is written as `.generate/game.js` (with an import
   header and an `export {...}` tail) and compiled by tsc as **JS**
   (`allowJs`, `checkJs: false`, `declaration`, `declarationMap`). Compiling as
   JS is what gives constructor-field inference and namespace merging.
5. **Post-emit patches** — all via `EditTracker` (every edit = one pass):
   - `applyMemberOverrides`: widens the injected `?: null` params to
     `?: any`, injects `INTERFACE_INJECTIONS` interfaces (payloads like
     `Credential`, widget shapes like `SubmenuButton`), retypes `Layer.Events`
     from an inline object literal into a mergeable `interface Events` +
     `var Events: Events` (consumers add events via declaration merging),
     applies `MEMBER_OVERRIDES` (namespace vars retyped in
     place; machine-alias pairs `var _x: any; export { _x as Member };`
     stripped in favor of a clean class static; otherwise a class static is
     stubbed), retargets the `//# sourceMappingURL=` comment to
     `lib.d.ts.map`.
   - `applyStaticMembers`: injects the `collectStaticMembers` findings onto
     `declare class` blocks — never duplicates members present on the class,
     upgrades only useless namespace types (`any`/`{}`), strips `_x` alias
     pairs. Explicit `MEMBER_OVERRIDES` always win (they run first).
6. **Declaration-map surgery** — `rewriteDeclarationMap` re-keys tsc's map
   rows from the pre-patch dts onto the patched dts (lines shift!) and points
   `sources` at `.generate/game.js`. Validated, then written to
   `lib.d.ts.map`.
7. **Validate** — `tsc --noEmit` over `userscript/` must pass.
8. **Combined texture names** — `fetchCombinedTextureNames` fetches the
   spritesheet atlas (`ASSET_HOST` = https://beta.fragline.com, URL follows
   AssetLoader's `dir/group/file` scheme, version parsed from
   `App.RESOURCES` in the bundle) and injects `CombinedTextureName` (union of
   all texture names) + `CombinedTexturesMap` (name-keyed map keeping a
   `Record<string, PIXI.Texture>` index for dynamic keys) via
   `INTERFACE_INJECTIONS`; `App.CombinedTextures` is retyped to it and
   `ModDetails.icon` uses the union. **Any failure degrades** to the old
   `Record<string, any>` with a log — the regen itself never fails on the
   network. Derived names land in `.generate/combined-names.json`.

## Invariants & gotchas (do not break these silently)

- **Every text rewrite must be recorded as a pass.** The declaration map is
  re-derived from the pass chain; a rewrite outside `applySpans`/`EditTracker`
  silently corrupts navigation.
- **tsserver hard-caps navigated file loads at 4MB.** `latest.js` is ~5.4MB and
  can never be a map source — that's why the map targets `.generate/game.js`
  (~3.7MB) instead. The generator drops the map entirely (with a loud warning)
  if the chunk outgrows the guard, keeping navigation inside `lib.d.ts`.
- **Validation uses no hardcoded line numbers.** Checks are regex-anchored on
  the dts + ±3000-char token windows in the game chunk, plus a full structural
  comparison of every tsc mapping. Bundle updates shift everything; the checks
  must stay position-independent.
- **Vendor version bumps come from bundle banners**, not manual edits — update
  `VERSION_DETECTORS` if the banner format changes.
- `MEMBER_OVERRIDES` is for userscript-attached runtime fields, modeled
  payload types, and genuine pixi/type conflicts only. If a member _moved or
  changed_ in the bundle, port the consumer code instead of faking the type.
  Explicit `MEMBER_OVERRIDES` always win over `collectStaticMembers`
  inference.
- `USERSRIPT_DIR` typo is baked into a constant name; paths are anchored at
  `import.meta.url`, so the scripts work from any cwd.
- tsc here is TypeScript 7 (native/tsgo). Some cast sites use `as any` around
  trace-mapping's readonly tuple types — tsgo mishandles direct tuple casts.

## Extension points

- New global with its member seed literal inside an initializer function →
  `LITERAL_INIT_FOLD_NAMES`; new global needing member folding (top-level
  assignments) → `MEMBER_FOLD_NAMES`; new
  EventDispatcher mixin → `DISPATCHER_MIXIN_NAMES` or `CLASSIFY_AS_CLASS`;
  new vendor bundle → `VENDOR_MARKERS` (+ `VERSION_DETECTORS` if typed).
- New runtime shape the bundle never declares (JSON payload or dynamically
  built widget object) → `INTERFACE_INJECTIONS` (emitted as exported
  interfaces), then reference it from `MEMBER_OVERRIDES`. Note: an interface
  extending a pixi class may only shadow inherited members with `any`
  (e.g. `label` on `SubmenuButton`/`Checkbox` vs `Container.label: string`).
- New dts patch → add to `applyMemberOverrides` via `EditTracker` only.
- New pipeline sanity check → follow the existing regex/window pattern in
  `validateDeclarationMap`.

## Self-update clause

**If your change touches the generator, the map surgery, the file layout, the
commands/flags, or any invariant listed above, update this AGENTS.md in the
same commit.** Treat this file as part of the code: a future agent (including
you) relies on it being current. When in doubt, re-read the top of
`generate-types.ts` and correct this document where they disagree.
