#!/usr/bin/env bash

source selfedit.sh

ELASTIC_DOWNLOAD_CACHE=${HOME}/.elastic-download-cache
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
        wget --directory-prefix=${ELASTIC_DOWNLOAD_CACHE} -N \
            ${ELASTIC_ARTIFACTS_URL}/${category}/${target}{.tar.gz,.tar.gz.sha512}

        cd ${ELASTIC_DOWNLOAD_CACHE} && shasum -a 512 -c ${ELASTIC_DOWNLOAD_CACHE}/${target}.tar.gz.sha512 || exit 1

        extract_dir=${ELASTIC_PRODUCTS_HOME}/${product}-${version}
        mkdir -p ${extract_dir}
        tar -C ${extract_dir} -xf ${ELASTIC_DOWNLOAD_CACHE}/${target}.tar.gz --strip 1
    fi
}

_clean_product() {
    _with_arguments 2 $@
    product=${1}
    version=${2}
    distro=${3}
    rm -rf ${ELASTIC_PRODUCTS_HOME}/${product}-${version}${distro}
}

_list_versions() {
    _with_arguments 1 $@
    product=${1}
    ls ${ELASTIC_PRODUCTS_HOME} | grep ${product}
}
