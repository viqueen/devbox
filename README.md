# devbox

### config
```bash
# required
./setup.sh config_box
npm install .
npm link

# optional, to setup the prompt line
./setup.sh config_prompt
```

### macOs dev setup
```bash
# installs home_brew and sets some lovely env vars
./setup.sh init_mac
# installs some dev, build tools, along with SpaceVim
./setup.sh init_dev_tools
# installs some sdks
./setup.sh init_sdks
```

### binaries

#### generic stuff

```bash
dev -h          # mainframe
mvnup -h        # maven version upgrade
jsonf           # json pretty format
image -h        # docker things
saymyname       # finds the longest java class name in a directory , I was bored once so I wrote this
```

#### atlassian stuff

```bash
atlas -h        # mainframe
# running and debugging atlassian server instances
confluence -h
jira -h
bitbucket -h
bamboo -h
```

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