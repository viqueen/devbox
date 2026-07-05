# devbox

## Setup and Configure

> :warning: this is heavily tailored towards bash, so may not work out of the (dev)box
> for zsh (zush) and friends

```bash
git clone --recursive https://github.com/viqueen/devbox.git

# required
./setup.sh config_box

# optional, to setup the prompt line
./setup.sh config_prompt

# optional, to setup vim
./setup.sh config_vim
git config --global core.editor vim
```

> :warning: to update the submodules

```bash
git submodule update --init --recursive
```

> :warning: install dependencies

```bash
mise install
pnpm install
```

## Optional - macOs dev setup

Install [mise](https://mise.jdx.dev/) for managing tool versions (node, java, python, etc.):

```bash
curl https://mise.run | sh
mise install
```

## Scripts and Binaries

### tricks up this sleeve : from anywhere

- navigate to where devbox is installed

```bash
. dev
```

- open existing scripts for edit

```bash
dev edit
gitar edit
```

- create a new script in devbox

```bash
dev edit mynewscript
```

> :information_source: all these scripts source `selfedit.sh`
> which allows you to quickly step into edit mode (uses vim under the hood)
>
> `selfedit.sh` also sources `selfdoc.sh` which allows you to add documentation hints
> to your commands

```bash
#! /usr/bin/env
source selfedit.sh

# @COMMAND one              does this and that
one() {
    echo "one"
}

# @COMMAND two              does these and those
two() {
    echo "two"
}

eval $@

if [[ -z $1 ]]; then
    $0 -h
fi
```

> :x: but please note that not all scripts in devbox follow this pattern

### housekeeping and generic scripts

```bash
dev -h          # mainframe
mvnup -h        # maven version upgrade
jsonf           # json pretty format
image -h        # docker things
gitar -h        # git things
saymyname       # finds the longest java class name in a directory , I was bored once so I wrote this
```

### Atlassian scripts

- extracted to [atlassian-devbox](https://github.com/viqueen/atlassian-devbox)
- install using homebrew

```bash
brew tap viqueen/atlassian-devbox
brew install atlassian-devbox
```

- or install using npm

```bash
npm install -g atlassian-devbox
```
