# AGENTS.md

Scope: the repo root and **`userscript/`** only. For anything under `lib/`,
read and follow **`lib/AGENTS.md`** first — lib is not documented here, and
this file deliberately does not reiterate it.

## Working with the game code

- `lib/latest.js` is the actual ninja.io site bundle the userscript patches.
  It is the ground truth for any implementation work — when in doubt about
  how the game behaves, look there.
- Workflow: find the class/member you need in the ambient typings
  (`lib/lib.d.ts`, imported as `"lib"` — see `paths` in
  `userscript/tsconfig.json`), then grep `latest.js` for that exact
  identifier to study the real implementation.
- `latest.js` is ~5MB and prettier-formatted. Too large to read or navigate
  directly — use the `lib` types to pick precise identifiers and areas, then
  grep targeted spots. Editors/tsserver cannot index the file itself (4MB
  hard cap); navigation goes through `lib.d.ts` / its declaration map.
- Never hand-edit `latest.js` or `lib.d.ts`. If the typings are stale or
  wrong, regenerate (`just lib`) — see `lib/AGENTS.md`.

## userscript/ architecture

esbuild-bundled TypeScript userscript — the modloader for ninja.io.
Dependencies are managed with bun (`bun.lock`).

Build inputs/outputs:

- `--dev` (`bun run dev`): esbuild watch + HTTP server on `:8000`; `dev.js`
  is the loader userscript that fetches the built script from localhost.
- `meta.json` — userscript manager metadata. The repeated `_match`,
  `__match`, ... keys are intentional: the build strips the leading
  underscores and emits one `@match` line per key.
- `version.json` (repo root) — version of record, read by the build.

Runtime layout under `src/`:

- `index.ts` — entry. Registers coremods + mods, polls until the game is
  ready (`app.menu.joinButton`, `APIClient.postCreateGame`, ...), then calls
  `Ninja.init()`.
- `api/Ninja.ts` — the singleton `Ninja` API: priority-ordered method
  monkey-patches (`hookMethod`), game events (`NinjaEvents` dispatched on an
  `EventDispatcher`), logging, and the global settings store.
- `api/Mod.ts` — `Mod` base class: `ModDetails` metadata, `loadon` timing
  (`pagestart` loads before the game, `appstart` the default),
  `implementConfig` for per-mod settings, load/unload lifecycle.
  `api/Settings.ts` — localStorage-backed store used for all settings.
- `coremods/` — built-in mods registered unconditionally (TexturePack,
  UIURLs). `mods/` — optional, user-installable mods. Both are auto-registered
  from their `index.ts` exports.
- Support: `config.ts` (version placeholder + game constants: Colors,
  MapIDs, WeaponReloadTimes), `hookModMenu.ts`, `globals.ts`, `utils.ts`.
  Prefer the game's own themed UI primitives (`UITheme.createUIPanel`,
  `MemberBrowserScrollbar`, ...) over hand-drawn styling.

## Adding a mod

1. Create `src/mods/<id>.ts` (or `src/coremods/` for built-ins) exporting a
   class extending `Mod<Config>`.
2. Call `this.implementConfig(defaults, names)` in the constructor; override
   `loadConfig(key)` to react to config changes and `load`/`unload` for
   setup/teardown.
3. Export the class from `src/mods/index.ts` (or `src/coremods/index.ts`) —
   registration is automatic from the exports.

## Commands

```sh
just build   # production build -> userscript/NinjaIOUtils.js (formatted after build)
just check   # typecheck userscript/ (tsc --noEmit)
just lib     # regenerate lib/lib.d.ts — see lib/AGENTS.md
just fmt ... # format via nix fmt (treefmt); no args = whole tree, paths restrict it
just update  # fetch the current site bundle into lib/latest.js, then nix fmt it
```

## Formatting

- `nix fmt` (flake.nix: treefmt) formats TS/JS/JSON with prettier
  (+ prettier-plugin-organize-imports) and Nix files with nixfmt.
- Prettier + organize-imports + typescript live in the repo-root
  `package.json`/`bun.lock` (`bun install` when bumping); flake.nix only
  supplies the bun runtime, so editor formatting and `nix fmt` are identical.
- Generated/artifact files are excluded from formatting (`lib/lib.d.ts` —
  prettier would invalidate its declaration map, `lib/bun.lock`,
  `userscript/NinjaIOUtils.js`, `lib/.generate/`, `node_modules/`) via both
  flake.nix excludes and `.prettierignore`; keep the two in sync.
- `lib/latest.js` is included and formatted by `just update`; `just lib` does
  NOT format it.
- Paths passed to `just fmt` are relative to the repo root (justfile recipes
  always run there; run `nix fmt` manually from the repo root for the same
  reason).

Dev loop: `cd userscript && bun run dev` (watch + serve on :8000), then load
`dev.js` in your userscript manager.

## Self-update clause

If your change makes any of the above stale (architecture, build behavior,
commands, mod API), update this file in the same commit. Treat it as part of
the code: future agents (including you) rely on it being current.
