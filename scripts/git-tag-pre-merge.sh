#!/usr/bin/env bash
# Create and push an annotated snapshot tag on the branch you are about to merge
# into (default: origin/main). Run immediately before merging so you can return
# to this commit later (new branch, reset, or compare).
#
# Usage:
#   npm run tag:pre-merge
#   npm run tag:pre-merge -- my-feature-name
#   npm run tag:pre-merge -- --yes my-feature-name
#   MAIN_REF=origin/other-branch npm run tag:pre-merge
#
# Environment:
#   MAIN_REF  Git ref to tag (default: origin/main)

set -euo pipefail

MAIN_REF="${MAIN_REF:-origin/main}"
AUTO_YES=false
SLUG=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    -y | --yes)
      AUTO_YES=true
      shift
      ;;
    -h | --help)
      cat <<'EOF'
Usage: git-tag-pre-merge.sh [-y|--yes] [slug]

  Creates an annotated tag on MAIN_REF (default: origin/main) and pushes it.
  Run right before you merge into that branch.

  With no slug, suggests: pre-merge-YYYYMMDD-<short-sha>
  With slug "My Feature": pre-merge-YYYYMMDD-my-feature

  -y, --yes   Skip the prompt (use suggested tag from slug or date+sha).

  npm run tag:pre-merge
  npm run tag:pre-merge -- my-feature
  npm run tag:pre-merge -- --yes my-feature

  MAIN_REF=origin/main (override if needed)
EOF
      exit 0
      ;;
    *)
      if [[ -n "${SLUG:-}" ]]; then
        echo "Unexpected extra argument: $1" >&2
        exit 1
      fi
      SLUG="$1"
      shift
      ;;
  esac
done

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Not a git repository." >&2
  exit 1
fi

git fetch origin

if ! git rev-parse "$MAIN_REF" >/dev/null 2>&1; then
  echo "Ref not found: $MAIN_REF (fetch origin and check MAIN_REF)." >&2
  exit 1
fi

commit_sha="$(git rev-parse "${MAIN_REF}^{commit}")"
short_sha="$(git rev-parse --short "${MAIN_REF}^{commit}")"
date_part="$(date +%Y%m%d)"

sanitize_slug() {
  echo "$1" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g' | sed -E 's/^-+|-+$//g'
}

if [[ -n "$SLUG" ]]; then
  safe="$(sanitize_slug "$SLUG")"
  if [[ -z "$safe" ]]; then
    echo "Slug became empty after sanitization; use letters/numbers, e.g. npm run tag:pre-merge -- visual-revamp" >&2
    exit 1
  fi
  suggested="pre-merge-${date_part}-${safe}"
else
  suggested="pre-merge-${date_part}-${short_sha}"
fi

validate_tag_name() {
  local t="$1"
  if [[ -z "$t" ]]; then
    echo "Tag name is empty." >&2
    return 1
  fi
  if [[ "$t" =~ [[:space:]] ]]; then
    echo "Tag name must not contain whitespace: $t" >&2
    return 1
  fi
  if [[ ! "$t" =~ ^[a-zA-Z0-9][a-zA-Z0-9._-]*$ ]]; then
    echo "Tag name: start with a letter or digit; then letters, digits, ., _, - only: $t" >&2
    return 1
  fi
  return 0
}

tag_exists() {
  if git show-ref --verify --quiet "refs/tags/$1" 2>/dev/null; then
    return 0
  fi
  if git ls-remote origin "refs/tags/$1" 2>/dev/null | grep -q .; then
    return 0
  fi
  return 1
}

final_tag=""
if [[ "$AUTO_YES" == "true" ]]; then
  final_tag="$suggested"
else
  echo ""
  echo "  Suggested tag:  $suggested"
  echo "  Points at:      $MAIN_REF → $commit_sha"
  echo "  Meaning:        snapshot of that ref before you merge; use later with:"
  echo "                    git fetch origin --tags && git checkout -b recover-$short_sha $suggested"
  echo ""
  read -r -p "[Enter] = use suggested tag  |  type another tag name  |  n = abort: " reply || true
  reply="${reply//$'\r'/}"
  reply="${reply#"${reply%%[![:space:]]*}"}"
  reply="${reply%"${reply##*[![:space:]]}"}"
  lower="$(echo "$reply" | tr '[:upper:]' '[:lower:]')"
  if [[ "$lower" == "n" || "$lower" == "no" ]]; then
    echo "Aborted."
    exit 0
  fi
  if [[ -n "$reply" ]]; then
    final_tag="$reply"
  else
    final_tag="$suggested"
  fi
fi

if ! validate_tag_name "$final_tag"; then
  exit 1
fi

if tag_exists "$final_tag"; then
  echo "Tag already exists (local or origin): $final_tag" >&2
  exit 1
fi

msg="Snapshot ${MAIN_REF} at ${commit_sha} before merge (${date_part})."

git tag -a "$final_tag" -m "$msg" "$commit_sha"
git push origin "refs/tags/$final_tag"

echo ""
echo "Created and pushed tag: $final_tag → $commit_sha"
