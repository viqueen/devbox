# devbox

### setup
```bash
# installs home_brew and sets some lovely env vars
./setup.sh init_mac
# installs some dev, build tools, along with SpaceVim
./setup.sh init_tools
# installs some sdks
./setup.sh init_sdks
```

### config
```bash
./setup.sh config_box
./setup.sh config_prompt
```

### binaries

```bash
dev -h
```

```
Version: dev 1.0.0

 Usage: dev [options] [commands]

 Commands:

 addkey                           adds ssh key
 audit [size?]                    checks for folders larger than 500MB in the current directory
 portid [port]                    displays process listening on target port
 gl                               pretty git log
 master [count?]                  top commiters to the repo
 pull                             git pull from upstream
 push                             git push to upstream

 edit [script]                    opens current or new bin-script
 _default                         returns first defined argument
 _replace [str] [char] [repl]     replace occurrence in string
 join [delim] [elements]          joins elements with delimiter
```