set dotenv-load := true

install:
    npm --prefix apps/frontend install
    cargo fetch --manifest-path apps/backend/Cargo.toml

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
    npm --prefix apps/frontend run build
    cargo check --manifest-path apps/backend/Cargo.toml
