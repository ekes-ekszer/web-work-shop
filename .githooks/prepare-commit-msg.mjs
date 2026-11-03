#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const commitMessageFile = process.argv[2];
if (!commitMessageFile || !existsSync(commitMessageFile)) {
  process.exit(0);
}

let branchName;
try {
  branchName = execFileSync(
    "git",
    ["symbolic-ref", "--quiet", "--short", "HEAD"],
    { encoding: "utf8" },
  ).trim();
} catch {
  process.exit(0);
}

const match = branchName.match(
  /^([A-Za-z0-9_-]+)\/([A-Za-z0-9_-]+)\/[1-9][0-9]*-[^/]+$/,
);
if (!match) {
  process.exit(0);
}

const prefix = `${match[1]}(${match[2]}): `;
const contents = readFileSync(commitMessageFile, "utf8");
const firstLineEnd = contents.indexOf("\n");
const firstLine =
  firstLineEnd === -1 ? contents : contents.slice(0, firstLineEnd);
if (!firstLine.startsWith(prefix)) {
  writeFileSync(commitMessageFile, `${prefix}${contents}`, "utf8");
}
