#! /usr/bin/env bash

if [[ -z ${1} ]];
then
    echo missing packages pattern to scan
    exit 1
fi

mvn -fae -e clean com.atlassian.maven.plugins:banned-packages-maven-plugin:scan \
    -Dscanned=${1} \
    -Dbanned="com.google.common.(base|collect).*" \
    -DfailOnViolation=true
