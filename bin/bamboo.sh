#!/usr/bin/env bash

source atlassian-product.sh

function product_definition() {
    version=$(_default $1 6.7.0)
    echo "--product bamboo --version ${version} --http-port 6990 --server 127.0.01
            --plugins com.atlassian.bamboo.plugins:atlassian-bamboo-plugin-test-utils:${version}"
}

function start() {
    start_product $(product_definition $@)
}

function debug() {
    debug_product $(product_definition $@)
}

eval $@