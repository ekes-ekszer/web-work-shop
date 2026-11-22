# set windows-shell := ["C:\\Program Files\\Git\\bin\\sh.exe", "-c"]

set dotenv-load := true

install:
    npm --prefix apps/frontend install
    cargo fetch --manifest-path apps/backend/Cargo.toml

setup-hooks:
    node .githooks/install.mjs

branch:
    node .github/scripts/create-branch.mjs

pr:
    node .github/scripts/create-pr.mjs

frontend:
    npm --prefix apps/frontend run dev

backend:
    cargo run --manifest-path apps/backend/Cargo.toml

dev:
    (npm --prefix apps/frontend run dev) & (cargo watch --workdir apps/backend --watch src --watch Cargo.toml --watch Cargo.lock --exec test --exec run) & wait

alias start := dev
alias run := dev

build:
    npm --prefix apps/frontend run build
    cargo build --manifest-path apps/backend/Cargo.toml

generate-types:
    cargo test --manifest-path apps/backend/Cargo.toml

check:
    cargo clippy --manifest-path apps/backend/Cargo.toml -- -D warnings
    npm --prefix apps/frontend run check

mcp-check:
    node scripts/verify-mcp.mjs

fmt:
    cargo fmt --manifest-path apps/backend/Cargo.toml
    npm --prefix apps/frontend run format
