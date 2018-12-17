#!/usr/bin/env bash

source selfedit.sh

function run_with_jvm_args() {
    jvm_args="${1}"; shift
    atlas-run-standalone --jvmargs "${jvm_args}" $@
}

function start_product() {
    run_with_jvm_args "-Xmx2048m" $@
}

function debug_product() {
    run_with_jvm_args "-Xmx2048m -Xdebug -Xrunjdwp:transport=dt_socket,address=5005,server=y,suspend=n" $@
}