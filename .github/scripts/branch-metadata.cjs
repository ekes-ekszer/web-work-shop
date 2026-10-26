function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/g, "");
}

function getBranchMetadata(issue, taxonomy) {
  const labels = issue.labels.map((label) =>
    typeof label === "string" ? label : label.name,
  );
  const typeLabels = labels.filter((label) => label.startsWith("type: "));
  const areaLabels = labels.filter((label) => label.startsWith("area: "));

  if (typeLabels.length !== 1 || areaLabels.length !== 1) {
    throw new Error(
      `Issue #${issue.number} must have exactly one type: <value> and one area: <value> label.`,
    );
  }

  const type = typeLabels[0].slice(6).trim();
  const area = areaLabels[0].slice(6).trim();
  if (!taxonomy.types.includes(type) || !taxonomy.scopes.includes(area)) {
    throw new Error(
      `Issue #${issue.number} uses unsupported taxonomy: type=${type}, area=${area}.`,
    );
  }

  const slug = slugify(issue.title);
  return {
    branchName: `${type}/${area}/${issue.number}-${slug}`,
    slug,
  };
}

module.exports = { getBranchMetadata, slugify };
