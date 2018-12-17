#!/usr/bin/env bash

source atlassian-product.sh

function start() {
    version=$(_default $1 6.7.0)
    start_product --product bamboo \
        --version ${version} \
        --http-port 6990 \
        --plugins com.atlassian.bamboo.plugins:atlassian-bamboo-plugin-test-utils:${version} \
        --server 127.0.0.1
}

function debug() {
    version=$(_default $1 6.7.0)
    debug_product  --product bamboo \
        --version ${version} \
        --http-port 6990 \
        --plugins com.atlassian.bamboo.plugins:atlassian-bamboo-plugin-test-utils:${version} \
        --server 127.0.0.1
}

eval $@