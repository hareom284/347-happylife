#!/usr/bin/env bash
# Astro 6 needs Node >= 22.12. The local shell may default to an older Node
# (e.g. Herd injecting v20), so activate a new-enough version via nvm when
# needed, then run the passed command. On CI — or any shell already on a
# new-enough Node — this is a transparent passthrough (no nvm required).
set -e

node_major() { node -v 2>/dev/null | sed 's/^v//' | cut -d. -f1; }

# Already good (covers CI where setup-node provides Node 24): just run it.
if [ "$(node_major)" -ge 22 ] 2>/dev/null; then
  exec "$@"
fi

# Otherwise try to source nvm from known locations and switch (reads .nvmrc).
for dir in "$NVM_DIR" "$HOME/Library/Application Support/Herd/config/nvm" "$HOME/.nvm"; do
  [ -n "$dir" ] && [ -s "$dir/nvm.sh" ] || continue
  export NVM_DIR="$dir"
  # shellcheck disable=SC1091
  . "$dir/nvm.sh"
  nvm use >/dev/null 2>&1 || nvm use 24 >/dev/null 2>&1 || nvm use node >/dev/null 2>&1
  break
done

if [ "$(node_major)" -ge 22 ] 2>/dev/null; then
  exec "$@"
fi

echo "Error: Astro 6 needs Node >= 22.12, but found $(node -v 2>/dev/null || echo 'no node')." >&2
echo "Install and activate it, e.g.:  nvm install 24 && nvm use" >&2
exit 1
