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

# typecheck the userscript
check:
    cd userscript && bunx tsc --noEmit
