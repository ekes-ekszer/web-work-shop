set dotenv-load := true

install:
    npm --prefix frontend install
    cargo fetch --manifest-path backend/Cargo.toml

frontend:
    npm --prefix frontend run dev

backend:
    cargo run --manifest-path backend/Cargo.toml

dev:
    (npm --prefix frontend run dev) & (cargo run --manifest-path backend/Cargo.toml) & wait

build:
    npm --prefix frontend run build
    cargo build --manifest-path backend/Cargo.toml

check:
    npm --prefix frontend run build
    cargo check --manifest-path backend/Cargo.toml
