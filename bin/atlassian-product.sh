#!/usr/bin/env bash

source selfedit.sh

ATLASSIAN_PRODUCTS_HOME=${VIQUEEN_DEVBOX_HOME}/.atlassian-products

function run_with_jvm_args() {
    jvm_args="${1}"; shift
    mkdir -p ${ATLASSIAN_PRODUCTS_HOME}
    cd ${ATLASSIAN_PRODUCTS_HOME}
    echo "atlas-run-standalone --jvmargs \"${jvm_args}\" $@"
}

function start_product() {
    run_with_jvm_args "-Xmx2048m" $@
}

# @COMMAND start [version]      starts product
function start() {
    eval $(start_cmd $@)
}

function debug_product() {
    run_with_jvm_args "-Xmx2048m -Xdebug -Xrunjdwp:transport=dt_socket,address=5005,server=y,suspend=n" $@
}

# @COMMAND debug [version]      starts product and opens debug port 5005
function debug() {
    eval $(debug_cmd $@)
}

function cmd() {
    _with_arguments 2 $@
    action=${1}
    version=${2}

    case ${action} in
        "start")
            start_cmd ${version}
            ;;
        "debug")
            debug_cmd ${version}
            ;;
    esac
}

function clean_product() {
    _with_arguments 2 $@
    product=${1}
    version=${2}
    rm -rf ${ATLASSIAN_PRODUCTS_HOME}/amps-standalone-${product}-${version}
}

function tail_product_logs() {
    _with_arguments 2 $@
    product=${1}
    version=${2}
    tail -f ${ATLASSIAN_PRODUCTS_HOME}/amps-standalone-${product}-${version}/target/${product}-LATEST.log
}

function view_product_logs() {
    _with_arguments 2 $@
    product=${1}
    version=${2}
    vim ${ATLASSIAN_PRODUCTS_HOME}/amps-standalone-${product}-${version}/target/${product}-LATEST.log
}

function list_versions() {
    _with_arguments 1 $@
    product=${1}
    ls ${ATLASSIAN_PRODUCTS_HOME} | grep ${product}
}

function get_product() {
    _with_arguments 2 $@
    product=${1}
    version=${2}
    cd ${ATLASSIAN_PRODUCTS_HOME}/amps-standalone-${product}-${version}/target
}