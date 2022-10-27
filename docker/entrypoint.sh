#!/usr/bin/env sh

set -o errexit
set -o nounset
cmd="$*"

if [ "$1" = 'start-tests' ]; then
  echo "start UI tests"
  npm run test
else
  exec "$cmd"
fi