#!/usr/bin/env bash

source selfedit.sh

ATLASSIAN_PRODUCTS_HOME=${VIQUEEN_DEVBOX_HOME}/.atlassian-products

function run_with_jvm_args() {
    jvm_args="${1}"; shift
    mkdir -p ${ATLASSIAN_PRODUCTS_HOME}
    cd ${ATLASSIAN_PRODUCTS_HOME}
    atlas-run-standalone --jvmargs "${jvm_args}" $@
}

function start_product() {
    run_with_jvm_args "-Xmx2048m" $@
}

function debug_product() {
    run_with_jvm_args "-Xmx2048m -Xdebug -Xrunjdwp:transport=dt_socket,address=5005,server=y,suspend=n" $@
}
