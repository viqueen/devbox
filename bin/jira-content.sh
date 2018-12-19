#!/usr/bin/env bash

source atlassian-product.sh

function start() {
    version=6.3.3
    start_product --product jira \
        --version ${version} \
        --http-port 11990 \
        --plugins com.atlassian.jira.plugins:jira-greenhopper-plugin:6.6.68,com.atlassian.jira.tests:jira-testkit-plugins:${version}
}

eval $@
