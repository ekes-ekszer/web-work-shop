set dotenv-load := true

install:
    npm --prefix apps/frontend install
    cargo fetch --manifest-path apps/backend/Cargo.toml

setup-hooks:
    install -m 755 .githooks/prepare-commit-msg .git/hooks/prepare-commit-msg

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

check-automation:
    node .github/scripts/test-automation.mjs

fmt:
    cargo fmt --manifest-path apps/backend/Cargo.toml
    npm --prefix apps/frontend run format
