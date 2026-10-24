# NinjaIOUtils task runner

default:
    @just --list

# regenerate lib/lib.d.ts from lib/latest.js
lib:
    cd lib && bun run types

# typecheck the lib generator scripts
lib-check:
    cd lib && bun run typecheck

# build the userscript
build:
    cd userscript && bun run start
    nix fmt userscript/NinjaIOUtils.js

# watch the userscript for changes and rebuild
dev:
    cd userscript && bun run dev

# typecheck the userscript
check:
    cd userscript && bunx tsc --noEmit

# format the whole tree via treefmt (flake.nix); pass paths to restrict
fmt *paths:
    nix fmt {{paths}}

# updates latest.js to the current upstream version
update:
    curl https://beta.fragline.com/js/dist/game.js > lib/latest.js
    nix fmt lib/latest.js
