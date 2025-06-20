# !/usr/bin/env bash

function lint() {
  echo "Running linter..."
  eslint cli/ --ext .js
  grep -rl '^#! */usr/bin/env node' cli/bin | xargs eslint
}

function lint_fix() {
  echo "Running linter with fix..."
  eslint cli/ --ext .js --fix
  grep -rl '^#! */usr/bin/env node' cli/bin | xargs eslint --fix
}

eval "$@"