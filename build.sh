# !/usr/bin/env bash

function lint() {
  echo "Running linter..."
  eslint cli/ --ext .js
  grep -rl '^#! */usr/bin/env node' cli/bin | xargs eslint
}

eval "$@"