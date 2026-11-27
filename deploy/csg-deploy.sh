#!/usr/bin/env bash
# Pull-based deploy for csg.uxwritingar.com.
#
# GitHub Actions builds the site and pushes the result to the `site` branch.
# This script runs on the server (cron, every 5 minutes, as user `uxwriting`):
# it fetches the `site` branch and, when it changed, syncs it into the web root.
# No inbound connection to the server is needed.
#
# Usage: csg-deploy.sh            # deploy only if the site branch changed
#        csg-deploy.sh --force    # deploy even if nothing changed

set -euo pipefail

REPO="${CSG_REPO:-https://github.com/UX-Writing/Content-Style-Guide-in-Arabic.git}"
BRANCH="${CSG_BRANCH:-site}"
SRC="${CSG_SRC:-$HOME/csg-site}"
DEST="${CSG_DEST:-$HOME/domains/csg.uxwritingar.com/public_html/public}"

# Only one run at a time
exec 9>"${TMPDIR:-/tmp}/csg-deploy.lock"
flock -n 9 || exit 0

force="${1:-}"

if [ ! -d "$SRC/.git" ]; then
  git clone --quiet --depth 1 --branch "$BRANCH" "$REPO" "$SRC"
  force="--force"
fi

cd "$SRC"
current="$(git rev-parse HEAD)"
git fetch --quiet --depth 1 origin "$BRANCH"
latest="$(git rev-parse FETCH_HEAD)"

if [ "$current" = "$latest" ] && [ "$force" != "--force" ]; then
  exit 0
fi

git reset --quiet --hard "$latest"

# --delete removes files that are no longer part of the site (old CSS/JS builds).
# .htaccess and .well-known/ (Let's Encrypt) in the web root are never touched.
rsync -rlc --delete \
  --exclude '.git/' \
  --exclude '.htaccess' \
  --exclude '.well-known/' \
  "$SRC"/ "$DEST"/

echo "$(date -Is) deployed $(git log -1 --format='%h %s')"
