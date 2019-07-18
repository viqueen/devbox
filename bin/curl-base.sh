#!/usr/bin/env bash

source selfedit.sh


_auth() {
    echo $(_default ${auth} 'admin:admin')
}

URL_QUERY=()

_query_options() {
    local OPTIND
    while getopts ":q:" option; do
        case ${option} in
            q) URL_QUERY+=("--data-urlencode ${OPTARG}") ;;
        esac
    done
    return "$((OPTIND - 1))"
}

_render_request_query() {
    for item in "${URL_QUERY[@]}"; do
        echo ${item}
    done
    if [[ "${#URL_QUERY[@]}" -gt 0 ]]; then
        echo '-G'
    fi
}

_set_once() {
    _with_arguments 2 $@
    name=${1}
    value=${2}
    if [[ -z ${!name} ]];
    then
        eval "${name}=${value}"
    fi
}

_requires_all() {
    while [[ "$#" -gt 0 ]]; do
        if [[ -z "${!1}" ]]; then
            echo "required options : $@"
            exit 1
        fi
        shift
    done
}

_match_any() {
    _with_arguments 2 $@
    item=${1}
    shift
    regex=$(_join '|' $@)
    if [[ ! ${item} =~ ${regex} ]]; then
        echo "${item} does not match required /${regex}/"
        exit 1
    fi
}

_url_options() {
    local OPTIND
    while getopts ":h:p:c:u:-:" option; do
        case ${option} in
            h) _set_once hostname ${OPTARG}   ;;
            p) _set_once port     ${OPTARG}   ;;
            c) _set_once context  ${OPTARG}   ;;
            u) _set_once auth     ${OPTARG}   ;;
            -)
                option_name="${OPTARG%=*}"
                option_value="${OPTARG#*=}"
                case ${option_name} in
                    instance    )   instance="${option_value}"  ;;
                esac
            ;;
        esac
    done
    return "$((OPTIND - 1))"
}

_base_url() {
    if [[ -z ${instance} ]]; then
        echo "http://${hostname}:${port}/${context}"
    else
        echo "${instance}"
    fi
}