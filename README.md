# devbox

### Playground - try it before you buy it

* alpine
```bash
# comes with openjdk 8
docker run -it --entrypoint=/bin/bash viqueen/teknologi:8-alpine
# comes with openjdk 14
docker run -it --entrypoint=/bin/bash viqueen/teknologi:14-alpine
```

* ubuntu
```bash
# comes with openjdk 11
docker run -it --entrypoint=/bin/bash viqueen/teknologi:11-slim
```

### Setup and Configure

```bash
git clone --recursive https://github.com/viqueen/devbox.git

# required
./setup.sh config_box
npm install .
npm link

# optional, to setup the prompt line
./setup.sh config_prompt

# optional, to setup vim
./setup.sh config_vim
git config --global core.editor vim
```

### Optional - macOs dev setup

<details>
<summary>init_mac</summary>
<p>

```bash
# home_brew
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

# terminal wisdom
brew install cowsay
brew install fortune
echo "fortune | cowsay" >> ~/.bash_profile
```

</p>
</details>

<details>
<summary>init_dev_tools</summary>
<p>

##### Requirements

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


### Scripts and Binaries

#### generic stuff

```bash
dev -h          # mainframe
mvnup -h        # maven version upgrade
jsonf           # json pretty format
image -h        # docker things
saymyname       # finds the longest java class name in a directory , I was bored once so I wrote this
```

#### atlassian stuff

It comes with the following product scripts that behave exactly the same

```bash
atlas -h        # mainframe
# running and debugging atlassian server instances
confluence -h
jira -h
bitbucket -h
bamboo -h
```

Each of them comes the following functions
`start [version]`
`debug [version]`
`logs [version]`
`versions`

so in the case of confluence, I usually investigate bugs by launching the version they were reported on

* start the instance
`confluence start 6.15.4`
* monitor the logs
`confluence logs 6.15.4`
* list the version I have already installed
`confluence versions`

but where are all those instances stored ?

fun fact, you can use the following command to navigate to where devbox is installed

`. dev`

and then you will find your standalone instances available under

`devbox/.atlassian-products/`


#### confluence devbox

These are the basics, but I trust you can poke around the repo to find out how to tune the options so the scripts are
interacting correctly with the confluence instance you are running (in terms of port, context path, user creds)

This whole repo is designed for simplicity and ease of use, so I do not want to overload it with tons of configurations

For questions find me on https://gitter.im/viqueen/devbox

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

