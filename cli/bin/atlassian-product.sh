#! /usr/bin/env bash

source selfedit.sh

_with_functions "_product_definition" "_product_name" "_product_group_id" "_product_webapp_name"

ATLASSIAN_PRODUCTS_HOME=${VIQUEEN_DEVBOX_HOME}/.atlassian-products

_run_with_jvm_args() {
    jvm_args="${1}"; shift
    echo "mvn com.atlassian.maven.plugins:amps-maven-plugin:8.2.0:run-standalone -Djvmargs='${jvm_args}' $@"
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
        "-Xmx2048m -Xdebug -Xrunjdwp:transport=dt_socket,address=${DEBUG_PORT:-5005},server=y,suspend=n" \
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

# @COMMAND get [version]                            cd to product's installed version
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

_list_wars() {
  product=$(_product_name)
  target_dir=$(_replace $(_product_group_id) "\." "/")
  webapp=$(_product_webapp_name)
  find ~/.m2/repository/${target_dir} -name "${webapp}-*war"
}

# @COMMAND wars                                     lists available versions in local maven repo
function wars() {
    webapp=$(_product_webapp_name)
    _list_wars \
        | awk -F "/" '{print $NF}' \
        | sed "s/${webapp}-\(.*\).war/\1/" \
        | sort -u
}

# @COMMAND purge                                   purge available versions in local maven repo
function purge() {
    type=${1:-internal}
    case ${type} in
      internal)
        _list_wars \
          | grep -E "SNAPSHOT|-m|-beta|-rc" \
          | xargs -I{} dirname {} \
          | xargs rm -r -v
        ;;
      all)
        _list_wars \
          | xargs -I{} dirname {} \
          | xargs rm -r -v
        ;;
      *)
        echo 'supports internal|all'
        ;;
    esac
}

# @COMMAND home                                     manage atlassian product home for development
function home() {
    product=$(_product_name)
    product_dev_home=${HOME}/data/${product}
    mkdir -p ${product_dev_home}

    if [[ -z ${1} ]]; then
        ls -lrt ${product_dev_home}
        exit 0
    fi

    version=${1}
    prefix=${2:-server}
    if [[ ${version} =~ ^master|([0-9]+.[0-9]+)$ ]]; then
        home_directory=${product_dev_home}/${prefix}-${version}
        mkdir -p ${home_directory}
        if [[ ${prefix} == *'dc'* ]]; then
            mkdir -p ${home_directory}/{main,node1,node2,node3,shared}
        fi
        ln -sfvn ${home_directory} ${product_dev_home}/home-default
        cd ${home_directory}
    else
        echo "invalid version"
    fi
}

# @COMMAND support                                  manage my support resources
function support() {
    product=$(_product_name)
    product_support_home=${HOME}/support/${product}
    mkdir -p ${product_support_home}

    if [[ -z ${1} ]]; then
        ls -lrt ${product_support_home}
        exit 0
    fi

    ticket=${1}
    support_directory=${product_support_home}/${ticket}
    mkdir -p ${support_directory}
    cd ${support_directory}
}
