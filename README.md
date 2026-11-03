# web-work-shop

An Astro frontend with a Rust/Axum backend.

## Prerequisites

- [Node.js](https://nodejs.org/) 22.12 or newer
- npm
- [GitHub CLI](https://cli.github.com/) for issue branch and pull request
  automation
- [Rust](https://www.rust-lang.org/tools/install) and Cargo
- [just](https://github.com/casey/just#installation)

## Install

From the repository root, run:

```sh
just install
```

This installs the frontend dependencies and downloads the Rust dependencies.
The repository automation scripts use Node.js and do not require Bash or `jq`.

## Git hooks

Install the repository's local Git hooks with:

```sh
just setup-hooks
```

The `prepare-commit-msg` hook prefixes commit messages on branches such as
`feat/be/13-jewelry-model` with `feat(be): `. Re-running the hook does not
duplicate an existing prefix.

## Issue branches

Create a branch interactively with a concise, human-chosen description:

```sh
just branch
```

The command asks for an issue number, retrieves its `type: <value>` and
`area: <value>` labels through the GitHub CLI, and asks for a short
description. It then creates a branch using the
`type/area/issue-description` convention from the current `HEAD`. For example,
issue `13` with `type: feat` and `area: be`, followed by `jewelry-model`,
creates `feat/be/13-jewelry-model`. Labels are validated against
[`.github/taxonomy.json`](./.github/taxonomy.json), and Git validates the final
branch name. Run `gh auth login` first if the GitHub CLI is not authenticated.

When the work is ready, create and configure its pull request with:

```sh
just pr
```

This pushes the current branch with upstream tracking, creates a PR title such
as `feat(3d): ring refraction`, applies the matching `type:` and `area:`
labels, and adds `Closes #13` to the PR body. The command expects the current
branch to follow the `type/area/issue-description` convention.

Pull request titles are checked against Conventional Commits by the
`Semantic PR title` workflow. Titles must use one of the supported types and
include a project scope, for example `feat(be): add jewelry model`. The
`Semantic PR title` job is configured as a required status check on `main`.

The supported commit and pull request types and scopes are listed in
[`.github/taxonomy.json`](./.github/taxonomy.json).

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
