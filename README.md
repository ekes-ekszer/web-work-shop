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

## Figma MCP

The repository includes a project-scoped VS Code MCP configuration in
[`.vscode/mcp.json`](./.vscode/mcp.json) for the official Figma remote server.
It provides two authentication options:

- `figma`: OAuth authentication managed by VS Code.
- `figma-token`: personal access token authentication. VS Code securely
  prompts for the token and does not save it in the repository.

To use the token option, create a Figma personal access token, start the
`figma-token` server from the MCP panel, and enter the token when prompted.
Do not replace the placeholder in `mcp.json` with the token itself.

To verify the configuration:

```sh
just mcp-check
```

After opening the repository in VS Code, start either server from the MCP
panel. For `figma`, complete the browser authentication flow. Then provide a
Figma file or frame link to Copilot when asking it to implement the design.
