# devbox

## Playground - try it before you buy it

- ubuntu

```bash
# comes with node 22.12.0
docker run -it --entrypoint=/bin/bash viqueen/devbox:main

# mount it
docker run --name <name_it> --volume <target_dir>:/sources/<target_dir> \
    -it --entrypoint=/bin/bash \
    -w=/sources/<target_dir>  \
    viqueen/devbox:main
```

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

> :warning: install node dependencies

```bash
nvm install
npm ci
```

## Optional - macOs dev setup

<details>
<summary>init_mac</summary>
<p>

```bash
# home_brew
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

# terminal wisdom
brew install cowsay
brew install fortune
echo "fortune | cowsay" >> ~/.profile
```

</p>
</details>

<details>
<summary>init_dev_tools</summary>
<p>

```bash

ln -sfvn ~/.bashrc ~/.profile
ln -sfvn ~/.bashrc ~/.bash_profile

# sdkman
curl -s "https://get.sdkman.io" | bash

sdk list java
sdk install java <>

# jenv (requires Java to be installed)
brew install jenv
echo 'export PATH="$HOME/.jenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(jenv init -)"' >> ~/.bashrc

# maven
brew install mvnvm
mvn --version

# node
brew install nvm
nvm install node

# ruby
brew install rbenv
echo 'eval "$(rbenv init -)"' >> ~/.bashrc

# other build tools
brew install ant
brew install gradle
brew install sbt

brew tap bazelbuild/tap
brew tap-pin bazelbuild/tap
brew install bazel


# aws
brew install awscli
```

</p>
</details>

<details>
<summary>init_languages and init_sdks</summary>
<p>

```bash
brew install scala
brew install kotlin
```

</p>
</details>

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

### Elastic scripts

It comes with the following enterprise product scripts that behave exactly the same

```bash
search -h
entsearch -h
kibana -h
logstash -h
filebeat -h
```

While I sort out a smooth easy to start elastic stack locally with one script, I navigate to the elastic products
I want by running the following

```bash
. search get 7.5.0
. entsearch get 7.5.0
. kibana get 7.5.0
. logstash get 7.5.0
. filebeat get 7.5.0
```

The above commands also take care of downloading the artifacts

> :warning: please notice the `_distro() { echo "darwin-x86_64" }` in `elastic-product.sh`, you
> probably want to adjust that to whatever distro you need for your platform.
