#!/usr/bin/env bash
# Removes pr-preview/pr-N folders from gh-pages when PR N is no longer open.
# Needs GH_TOKEN and REPO. With DRY_RUN=true it only lists the folders.
#
# Only the latest commit and folder listings are downloaded, not file
# contents, so this stays fast however big gh-pages is.
set -euo pipefail

work=$(mktemp -d)
trap 'rm -rf "$work"' EXIT

git clone --quiet --filter=blob:none --no-checkout --depth 1 --branch gh-pages \
  "https://x-access-token:${GH_TOKEN}@github.com/${REPO}.git" "$work/site"
cd "$work/site"

gh pr list --repo "$REPO" --state open --limit 1000 --json number --jq '.[].number' | sort -n > "$work/open.txt"
# An empty list would mean every preview gets removed; stop instead
if [ ! -s "$work/open.txt" ]; then
  echo "Couldn't list open PRs; nothing removed"
  exit 1
fi

git ls-tree -d --name-only HEAD pr-preview/ | while read -r dir; do
  grep -qx "${dir#pr-preview/pr-}" "$work/open.txt" || echo "$dir"
done > "$work/stale.txt"

echo "Open PRs: $(wc -l < "$work/open.txt")"
echo "Previews of closed PRs: $(wc -l < "$work/stale.txt")"
cat "$work/stale.txt"

if [ ! -s "$work/stale.txt" ] || [ "${DRY_RUN:-false}" = true ]; then
  exit 0
fi

git reset --quiet
xargs git rm -r --cached --quiet < "$work/stale.txt"
git -c user.name="github-actions[bot]" -c user.email="41898282+github-actions[bot]@users.noreply.github.com" \
  commit --quiet -m "Remove previews of closed PRs"
git push --quiet origin HEAD:gh-pages
echo "Removed $(wc -l < "$work/stale.txt") previews"
