# set windows-shell := ["C:\\Program Files\\Git\\bin\\sh.exe", "-c"]

set dotenv-load := true

install:
    npm --prefix apps/frontend install
    cargo fetch --manifest-path apps/backend/Cargo.toml

setup-hooks:
    install -m 755 .githooks/prepare-commit-msg .git/hooks/prepare-commit-msg

branch:
    .github/scripts/create-branch.sh

pr:
    .github/scripts/create-pr.sh

frontend:
    npm --prefix apps/frontend run dev

backend:
    cargo run --manifest-path apps/backend/Cargo.toml

dev:
    (npm --prefix apps/frontend run dev) & (cargo run --manifest-path apps/backend/Cargo.toml) & wait

build:
    npm --prefix apps/frontend run build
    cargo build --manifest-path apps/backend/Cargo.toml

check:
    cargo clippy --manifest-path apps/backend/Cargo.toml -- -D warnings
    npm --prefix apps/frontend run check

mcp-check:
    node scripts/verify-mcp.mjs

fmt:
    cargo fmt --manifest-path apps/backend/Cargo.toml
    npm --prefix apps/frontend run format
