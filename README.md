# devbox

## Playground - try it before you buy it

* ubuntu
```bash
# comes with openjdk 8
docker run -it --entrypoint=/bin/bash viqueen/teknologi:8-slim
# comes with openjdk 11
docker run -it --entrypoint=/bin/bash viqueen/teknologi:11.0.6-slim
# comes with openjdk 14
docker run -it --entrypoint=/bin/bash viqueen/teknologi:14-slim
```

## Setup and Configure

> :warning: this is heavily tailored towards bash, so may not work out of the (dev)box
> for zsh (zush) and friends

```bash
git clone --recursive https://github.com/viqueen/devbox.git

# required
./setup.sh config_box
npm link

# optional, to setup the prompt line
./setup.sh config_prompt

# optional, to setup vim
./setup.sh config_vim
git config --global core.editor vim
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

#### Requirements

* [java](https://adoptopenjdk.net/?variant=openjdk11&jvmVariant=hotspot)

```bash
# java
brew install jenv
echo 'export PATH="$HOME/.jenv/bin:$PATH"' >> ~/.bash_profile
echo 'eval "$(jenv init -)"' >> ~/.bash_profile

# maven
brew install mvnvm
mvn --version

# node (TODO: provide through brew)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.1/install.sh | bash
nvm install node

# ruby
brew install rbenv
echo 'eval "$(rbenv init -)"' >> ~/.bash_profile

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
# atlassian
brew tap atlassian/tap
brew install atlassian/tap/atlassian-plugin-sdk
echo "export ATLAS_MVN=$(which mvn)" >> ~/.profile
```

```bash
brew install scala
brew install kotlin
```

</p>
</details>


## Scripts and Binaries

### tricks up this sleeve : from anywhere

* navigate to where devbox is installed
```bash
. dev
```

* open existing scripts for edit
```bash
dev edit
gitar edit
```

* create a new script in devbox
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

> :warning: these are wrappers around the atlassian-sdk 
> so please make sure you have it installed 

<details>
<summary>install_atlassian_sdk</summary>
<p>

* mac OS
```bash
brew tap atlassian/tap
brew install atlassian/tap/atlassian-plugin-sdk
```

* for other platforms, please take a look at https://developer.atlassian.com/server/framework/atlassian-sdk/downloads/

</p>
</details>

It comes with the following enterprise product scripts that behave exactly the same

```bash
atlas -h        # mainframe

# running and debugging atlassian server instances
confluence -h
jira -h
bitbucket -h
bamboo -h
fecru -h
crowd -h
```

Each of them comes with the following functions

```
start [version]                          starts product
debug [version]                          starts product with debug port
clean [version-pattern]                  cleans product directory for given version pattern
versions                                 lists installed product versions
cmd [action] [version]                   displays resolved command
get [version]                           cd to product's installed version
view [version]                           view product logs
wars                                     lists available versions in local maven repo
```

So in the case of Confluence, I usually kick off my dev by launching the version I am interested in

* start the instance
`confluence start 6.15.4`
* monitor the logs
`confluence logs 6.15.4`
* list the version I have already installed
`confluence versions`

The instances are installed under `.atlassian-products` directory

#### confluence devbox

This is a development helper plugin I use in all my feature/bug-fix endeavours 

```bash
# build it
cd confluence-devbox
atlas build
# update the following to match your context path and port
atlas pi confluence 8080 

# setup an smtp server
confdev post setup smtp-server
# create multiple users
confdev post setup users
```

> :information_source: These are the basics, but I trust you can poke around the repo to find out how to tune 
> the options so the scripts are interacting correctly with the confluence instance you are running (in terms of port, context path, user creds)
> This whole repo is designed for simplicity and ease of use, so I do not want to overload it with tons of configurations


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