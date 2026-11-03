#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import path from "node:path";

const repositoryRoot = execFileSync("git", ["rev-parse", "--show-toplevel"], {
  encoding: "utf8",
}).trim();
const taxonomy = JSON.parse(
  readFileSync(
    path.join(repositoryRoot, ".github", "taxonomy.json"),
    "utf8",
  ),
);
const prompt = createInterface({ input, output });

const ask = async (question) => (await prompt.question(question)).trim();

try {
  const issueNumber = await ask("Issue number: ");
  if (!/^[1-9][0-9]*$/.test(issueNumber)) {
    throw new Error("Issue number must be a positive integer.");
  }

  let labelsJson;
  try {
    labelsJson = execFileSync(
      "gh",
      ["issue", "view", issueNumber, "--json", "labels"],
      { encoding: "utf8" },
    );
  } catch {
    throw new Error(`Could not retrieve labels for issue #${issueNumber}.`);
  }

  const labels = JSON.parse(labelsJson).labels.map(({ name }) => name);
  const typeLabels = labels
    .filter((label) => label.startsWith("type: "))
    .map((label) => label.slice("type: ".length));
  const areaLabels = labels
    .filter((label) => label.startsWith("area: "))
    .map((label) => label.slice("area: ".length));

  if (typeLabels.length !== 1 || areaLabels.length !== 1) {
    throw new Error(
      `Issue #${issueNumber} must have exactly one type: and one area: label.`,
    );
  }

  const [type] = typeLabels;
  const [area] = areaLabels;
  if (!taxonomy.types.includes(type) || !taxonomy.scopes.includes(area)) {
    throw new Error(
      `Issue #${issueNumber} uses unsupported branch labels: type=${type}, area=${area}.`,
    );
  }

  const description = await ask("Short description: ");
  if (!description) {
    throw new Error("Branch description cannot be empty.");
  }

  const branchName = `${type}/${area}/${issueNumber}-${description}`;
  try {
    execFileSync("git", ["check-ref-format", "--branch", branchName], {
      stdio: "ignore",
    });
  } catch {
    throw new Error(`Invalid Git branch name: ${branchName}`);
  }

  try {
    execFileSync("git", [
      "show-ref",
      "--verify",
      "--quiet",
      `refs/heads/${branchName}`,
    ]);
    throw new Error(`A local branch named '${branchName}' already exists.`);
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("A local branch")) {
      throw error;
    }
  }

  execFileSync("git", ["switch", "--create", branchName], { stdio: "inherit" });
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  prompt.close();
}
