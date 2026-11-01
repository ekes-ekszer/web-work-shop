#!/usr/bin/env bash

set -euo pipefail

branch_name="$(git symbolic-ref --quiet --short HEAD 2>/dev/null || true)"
if [[ ! "$branch_name" =~ ^([[:alnum:]_-]+)/([[:alnum:]_-]+)/([1-9][0-9]*)-([^/]+)$ ]]; then
    echo "Current branch must match type/area/issue-description." >&2
    exit 1
fi

type="${BASH_REMATCH[1]}"
area="${BASH_REMATCH[2]}"
issue_number="${BASH_REMATCH[3]}"
description="${BASH_REMATCH[4]}"

taxonomy_file="$(git rev-parse --show-toplevel)/.github/taxonomy.json"
if ! jq -e --arg type "$type" '.types | index($type) != null' "$taxonomy_file" >/dev/null ||
    ! jq -e --arg area "$area" '.scopes | index($area) != null' "$taxonomy_file" >/dev/null; then
    echo "Branch uses unsupported type or area: type=$type, area=$area." >&2
    exit 1
fi

title_description="$(tr '_-' '  ' <<<"$description" | sed -E 's/ +/ /g; s/^ | $//g')"
title="$type($area): $title_description"

git push --set-upstream origin "$branch_name"
gh pr create \
    --title "$title" \
    --body "Closes #$issue_number" \
    --label "type: $type" \
    --label "area: $area"
