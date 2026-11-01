#!/usr/bin/env bash

set -euo pipefail

repository_root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/../.." && pwd)"
taxonomy_file="$repository_root/.github/taxonomy.json"

read -r -p "Issue number: " issue_number
if [[ ! "$issue_number" =~ ^[1-9][0-9]*$ ]]; then
    echo "Issue number must be a positive integer." >&2
    exit 1
fi

if ! labels_json="$(gh issue view "$issue_number" --json labels)"; then
    echo "Could not retrieve labels for issue #$issue_number." >&2
    exit 1
fi

mapfile -t type_labels < <(jq -r '.labels[].name | select(startswith("type: ")) | sub("^type: "; "")' <<<"$labels_json")
mapfile -t area_labels < <(jq -r '.labels[].name | select(startswith("area: ")) | sub("^area: "; "")' <<<"$labels_json")
if [[ "${#type_labels[@]}" -ne 1 || "${#area_labels[@]}" -ne 1 ]]; then
    echo "Issue #$issue_number must have exactly one type: and one area: label." >&2
    exit 1
fi

type="${type_labels[0]}"
area="${area_labels[0]}"
if ! jq -e --arg type "$type" '.types | index($type) != null' "$taxonomy_file" >/dev/null ||
    ! jq -e --arg area "$area" '.scopes | index($area) != null' "$taxonomy_file" >/dev/null; then
    echo "Issue #$issue_number uses unsupported branch labels: type=$type, area=$area." >&2
    exit 1
fi

read -r -p "Short description: " description
if [[ -z "$description" ]]; then
    echo "Branch description cannot be empty." >&2
    exit 1
fi

branch_name="$type/$area/$issue_number-$description"
if ! git check-ref-format --branch "$branch_name" >/dev/null; then
    echo "Invalid Git branch name: $branch_name" >&2
    exit 1
fi
if git show-ref --verify --quiet "refs/heads/$branch_name"; then
    echo "A local branch named '$branch_name' already exists." >&2
    exit 1
fi

git switch --create "$branch_name"
