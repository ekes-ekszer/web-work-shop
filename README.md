# web-work-shop

An Astro frontend with a Rust/Axum backend.

## Prerequisites

- [Node.js](https://nodejs.org/) 22.12 or newer
- npm
- [Rust](https://www.rust-lang.org/tools/install) and Cargo
- [just](https://github.com/casey/just#installation)

## Install

From the repository root, run:

```sh
just install
```

This installs the frontend dependencies and downloads the Rust dependencies.

## Git hooks

Install the repository's local Git hooks with:

```sh
just setup-hooks
```

The `prepare-commit-msg` hook prefixes commit messages on branches such as
`feat/be/13-jewelry-model` with `feat(be): `. Re-running the hook does not
duplicate an existing prefix.

## Run in development

Start both services with one command:

```sh
just dev
```

The services are available at:

- Frontend: http://localhost:4321
- Backend: http://localhost:3000

Press `Ctrl+C` to stop both services.

To run only one service:

```sh
just frontend
just backend
```

## Build and check

```sh
just build
just check
```

The command definitions are in [`justfile`](./justfile).
