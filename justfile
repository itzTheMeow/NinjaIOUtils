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

# watch the userscript for changes and rebuild
dev:
    cd userscript && bun run dev

# typecheck the userscript
check:
    cd userscript && bunx tsc --noEmit

# updates latest.js to the current upstream version
update:
    curl https://beta.fragline.com/js/dist/game.js > lib/latest.js
    prettier lib/latest.js --write
