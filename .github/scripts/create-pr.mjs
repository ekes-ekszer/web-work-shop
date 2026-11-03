#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";

const run = (command, args, options = {}) =>
  execFileSync(command, args, { encoding: "utf8", ...options }).trim();

try {
  const branchName = run("git", [
    "symbolic-ref",
    "--quiet",
    "--short",
    "HEAD",
  ]);
  const match = branchName.match(
    /^([A-Za-z0-9_-]+)\/([A-Za-z0-9_-]+)\/([1-9][0-9]*)-([^/]+)$/,
  );
  if (!match) {
    throw new Error("Current branch must match type/area/issue-description.");
  }

  const [, type, area, issueNumber, description] = match;
  const repositoryRoot = run("git", ["rev-parse", "--show-toplevel"]);
  const taxonomy = JSON.parse(
    readFileSync(
      path.join(repositoryRoot, ".github", "taxonomy.json"),
      "utf8",
    ),
  );

  if (!taxonomy.types.includes(type) || !taxonomy.scopes.includes(area)) {
    throw new Error(
      `Branch uses unsupported type or area: type=${type}, area=${area}.`,
    );
  }

  const titleDescription = description.replace(/[_-]+/g, " ").trim();
  const title = `${type}(${area}): ${titleDescription}`;

  execFileSync("git", ["push", "--set-upstream", "origin", branchName], {
    stdio: "inherit",
  });
  execFileSync(
    "gh",
    [
      "pr",
      "create",
      "--title",
      title,
      "--body",
      `Closes #${issueNumber}`,
      "--label",
      `type: ${type}`,
      "--label",
      `area: ${area}`,
    ],
    { stdio: "inherit" },
  );
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
