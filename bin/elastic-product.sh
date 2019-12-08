#!/usr/bin/env bash

source selfedit.sh

ELASTIC_PRODUCTS_HOME=${VIQUEEN_DEVBOX_HOME}/.elastic-products
ELASTIC_ARTIFACTS_URL="https://artifacts.elastic.co/downloads"

_distro() {
    echo "darwin-x86_64"
}

_maybe_download_product() {
    _with_arguments 3 $@
    category=${1}
    product=${2}
    version=${3}
    distro=${4}

    target="${product}-${version}${distro}"

    if [[ ! -d "${ELASTIC_PRODUCTS_HOME}/${product}-${version}" ]]; then
        wget --directory-prefix=/tmp ${ELASTIC_ARTIFACTS_URL}/${category}/${target}{.tar.gz,.tar.gz.sha512}
        cd /tmp && shasum -a 512 -c /tmp/${target}.tar.gz.sha512 || exit 1
        cd ${ELASTIC_PRODUCTS_HOME}
        tar -xvf /tmp/${target}.tar.gz
        rm -rf /tmp/${target}.tar.gz*
    fi
}