#!/usr/bin/env node

import { chmodSync, copyFileSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";

const repositoryRoot = execFileSync("git", ["rev-parse", "--show-toplevel"], {
  encoding: "utf8",
}).trim();
const hooksDirectory = path.join(repositoryRoot, ".git", "hooks");
const source = path.join(repositoryRoot, ".githooks", "prepare-commit-msg.mjs");
const destination = path.join(hooksDirectory, "prepare-commit-msg");

mkdirSync(hooksDirectory, { recursive: true });
copyFileSync(source, destination);
chmodSync(destination, 0o755);
console.log(`Installed ${path.relative(repositoryRoot, destination)}.`);
