#!/usr/bin/env bash

function lint() {
  echo "Running linter..."
  grep -rl '^#! */usr/bin/env node' cli/bin | xargs eslint
}

function lint_fix() {
  echo "Running linter with fix..."
  grep -rl '^#! */usr/bin/env node' cli/bin | xargs eslint --fix
}

eval "$@"