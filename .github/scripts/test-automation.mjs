import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const taxonomy = JSON.parse(
  await readFile(new URL("../taxonomy.json", import.meta.url), "utf8"),
);
const { getBranchMetadata } = require("./branch-metadata.cjs");
const metadataSource = await readFile(
  new URL("./branch-metadata.cjs", import.meta.url),
  "utf8",
);
const workflow = await readFile(
  new URL("../workflows/create-branch.yml", import.meta.url),
  "utf8",
);

assert.deepEqual(
  [...new Set(taxonomy.types)].sort(),
  taxonomy.types.slice().sort(),
  "types must not contain duplicates",
);
assert.deepEqual(
  [...new Set(taxonomy.scopes)].sort(),
  taxonomy.scopes.slice().sort(),
  "scopes must not contain duplicates",
);
assert.match(workflow, /types: \[assigned\]/);
assert.match(
  metadataSource,
  /must have exactly one type: <value> and one area: <value>/,
);
assert.match(
  workflow,
  /branchUrl = `https:\/\/github\.com\/\$\{owner\}\/\$\{repo\}\/tree\/\$\{branchName\}`/,
);

const metadata = getBranchMetadata(
  {
    number: 13,
    title: "Fix login / add tests",
    labels: [{ name: "type: fix" }, { name: "area: be" }],
  },
  taxonomy,
);
assert.deepEqual(metadata, {
  branchName: "fix/be/13-fix-login-add-tests",
  slug: "fix-login-add-tests",
});
assert.throws(
  () =>
    getBranchMetadata(
      {
        number: 14,
        title: "Missing area",
        labels: [{ name: "type: fix" }],
      },
      taxonomy,
    ),
  /exactly one type: <value> and one area: <value>/,
);
assert.throws(
  () =>
    getBranchMetadata(
      {
        number: 15,
        title: "Unsupported type",
        labels: [{ name: "type: unknown" }, { name: "area: be" }],
      },
      taxonomy,
    ),
  /unsupported taxonomy/,
);

console.log("Automation checks passed");
