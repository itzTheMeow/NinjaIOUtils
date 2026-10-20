# NinjaIOUtils task runner

default:
    @just --list

# regenerate lib/lib.d.ts from lib/latest.js
lib:
    cd lib && bun run types

# typecheck the lib generator scripts
lib-check:
    cd lib && bun run typecheck
