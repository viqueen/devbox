#! /usr/bin/env bash

source selfedit.sh

_with_functions "_product_definition" "_product_name"

ATLASSIAN_PRODUCTS_HOME=${VIQUEEN_DEVBOX_HOME}/.atlassian-products

_run_with_jvm_args() {
    jvm_args="${1}"; shift
    echo "atlas-run-standalone --jvmargs \"${jvm_args}\" $@"
}

_start_cmd() {
    _run_with_jvm_args "-Xmx2048m" $(_product_definition $@)
}

# @COMMAND start [version]                          starts product
function start () {
    _with_arguments 1 $@
    mkdir -p ${ATLASSIAN_PRODUCTS_HOME}
    cd ${ATLASSIAN_PRODUCTS_HOME}
    eval $(_start_cmd $@)
}

_debug_cmd() {
    _run_with_jvm_args \
        "-Xmx2048m -Xdebug -Xrunjdwp:transport=dt_socket,address=5005,server=y,suspend=n" \
        $(_product_definition $@)
}

# @COMMAND debug [version]                          starts product with debug port
function debug() {
    _with_arguments 1 $@
    mkdir -p ${ATLASSIAN_PRODUCTS_HOME}
    cd ${ATLASSIAN_PRODUCTS_HOME}
    eval $(_debug_cmd $@)
}

# @COMMAND clean [version-pattern]                  cleans product directory for given version pattern
function clean() {
    _with_arguments 1 $@
    product=$(_product_name)
    version=${1}
    rm -rf ${ATLASSIAN_PRODUCTS_HOME}/amps-standalone-${product}-${version}
}

# @COMMAND versions                                 lists installed product versions
function versions() {
    product=$(_product_name)
    ls ${ATLASSIAN_PRODUCTS_HOME} \
        | grep ${product}
}

# @COMMAND cmd [action] [version]                   displays resolved command
function cmd() {
    _with_arguments 2 $@
    action=${1}
    version=${2}

    case ${action} in
        "start")
            _start_cmd ${version}
            ;;
        "debug")
            _debug_cmd ${version}
            ;;
        *)
            echo "unknown command : [ start , debug ] allowed"
            ;;
    esac
}

# @COMMAND get [version]                           cd to product's installed version
function get() {
    _with_arguments 1 $@
    product=$(_product_name)
    version=${1}
    cd ${ATLASSIAN_PRODUCTS_HOME}/amps-standalone-${product}-${version}/target
}

# @COMMANDS logs [version]                          tails product logs
function logs() {
    _with_arguments 1 $@
    product=$(_product_name)
    version=${1}
    tail -f ${ATLASSIAN_PRODUCTS_HOME}/amps-standalone-${product}-${version}/target/${product}-LATEST.log
}

# @COMMAND view [version]                           view product logs
function view() {
    _with_arguments 1 $@
    product=$(_product_name)
    version=${1}
    vim ${ATLASSIAN_PRODUCTS_HOME}/amps-standalone-${product}-${version}/target/${product}-LATEST.log
}
