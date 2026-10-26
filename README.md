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

## Issue branches

Assigning an issue creates a remote branch using the
`<type>/<area>/<issue#>-<slug>` schema. Issues must have one `type: <value>`
label and one `area: <value>` label, such as `type: feat` and `area: be`.
Exactly one of each label is required, and values must be listed in
[`.github/taxonomy.json`](./.github/taxonomy.json). The branch is created from
the repository's default branch. If the branch already exists, it is reused and
the issue receives a link to it. Missing or unsupported labels fail clearly
instead of creating a malformed branch.

Pull request titles are checked against Conventional Commits by the
`Semantic PR title` workflow. Titles must use one of the supported types and
include a project scope, for example `feat(be): add jewelry model`. The
`Semantic PR title` job is configured as a required status check on `main`.

The workflows need Actions write permission for branch creation and issue
comments. Run `just check-automation` to validate the branch schema, taxonomy,
and title-slug behavior locally.

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
