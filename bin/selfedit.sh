#!/usr/bin/env bash
#
# @LICENSE  Apache-2.0
# @AUTHOR   Hasnae R.
# @VERSION  1.0.0
#

source selfdoc.sh

VIQUEEN_DEVBOX_BIN=${VIQUEEN_DEVBOX_HOME}/bin

# @COMMAND edit [script]                    opens current or new bin-script
edit() {
    script=${VIQUEEN_DEVBOX_BIN}/${1}
    if [ -z ${1} ];
    then
        script=${0}
    fi
    vim ${script}
    chmod +x ${script}
}

# @COMMAND _default                         returns first defined argument
_default() {
    echo $1
}

# @COMMAND _replace [str] [char] [repl]     replace occurrence in string
_replace() {
    echo ${1//$2/$3}
}

# @COMMAND join [delim] [elements]          joins elements with delimiter
_join() {
    delim=$1
    shift
    output=$(printf "$delim%s" "${@}")
    echo ${output:1}
}