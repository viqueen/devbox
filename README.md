# devbox

## Prerequisites

Install [mise](https://mise.jdx.dev/) for managing tool versions:

```bash
brew install mise
```

## Setup

```bash
git clone https://github.com/viqueen/devbox.git
cd devbox

# install tools (node, pnpm)
mise install

# install dependencies
pnpm install

# configure shell (exports, PATH, aliases, mise config symlink)
./setup.sh config_box

# optional: workspace-aware prompt
./setup.sh config_prompt

# optional: vim with an easy-on-the-eyes theme
./setup.sh config_vim
```

## What's Included

### Tools (via mise)

Defined in `.mise.toml` and symlinked to `~/.mise.toml` by `config_box`:

| Tool | Purpose         |
| ---- | --------------- |
| node | Node.js runtime |
| pnpm | Package manager |

### Prompt

A dependency-free, workspace-aware prompt (`cli/.promptline.sh`) that color-codes the hostname
segment based on which workspace you're in:

| Workspace                      | Color  |
| ------------------------------ | ------ |
| `workspaces/viqueen/*`         | orange |
| `workspaces/{primary_org}/*`   | purple |
| `workspaces/{secondary_org}/*` | blue   |
| `~/`                           | green  |
| elsewhere                      | red    |

Configure orgs via env vars: `VIQUEEN_DEVBOX_PRIMARY_ORG`, `VIQUEEN_DEVBOX_SECONDARY_ORG`.

### Editor

Plain vim, no plugin manager, no alias. `config_vim` symlinks `cli/.vimrc` to `~/.vimrc`, so
running `vim` anywhere (shell, scripts, `git commit`) picks up the config automatically. Uses
vim's built-in `retrobox` colorscheme (gruvbox-style, muted and dark) — no vendored colors file
to maintain, requires vim 9+.

### Scripts and Binaries

#### Quick navigation

```bash
. dev              # navigate to devbox
dev edit           # open dev script for edit
dev edit myscript  # create a new script
```

#### Available commands

```bash
dev -h             # housekeeping and generic scripts
mvnup -h           # maven version upgrade
jsonf              # json pretty format
image -h           # docker things
gitar -h           # git things
```

All scripts source `selfedit.sh` (edit mode via vim) and `selfdoc.sh` (auto-generated help from `@COMMAND` annotations):

```bash
#! /usr/bin/env bash
source selfedit.sh

# @COMMAND one              does this and that
one() {
    echo "one"
}

eval $@

if [[ -z $1 ]]; then
    $0 -h
fi
```

### Atlassian scripts

Extracted to [atlassian-devbox](https://github.com/viqueen/atlassian-devbox):

```bash
brew tap viqueen/atlassian-devbox
brew install atlassian-devbox
```
