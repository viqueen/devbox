#! /usr/bin/env bash
#
# @LICENSE  Apache-2.0
# @AUTHOR   Hasnae R.
# @VERSION  1.0.0
#

__version_number() {
    grep "^# @VERSION " "$0" | cut -c 11-
}

__version() {
    echo " Version: $(basename "$0") $(__version_number)"
}

__sourced_commands() {
    SOURCES=($(printf "%q\n" "${BASH_SOURCE[@]}" | sort -u))
    for item in "${SOURCES[@]}"
    do
        echo "** SOURCE : $item"
        grep "^# @COMMAND " ${item} | cut -c 11-
        echo ""
    done
}

__help() {
    __version
    echo ""
    echo " Usage: $(basename $0) [options] [commands]"
    echo ""
    echo " Commands:"
    echo ""
    __sourced_commands
}

while getopts "Vh-" opt; do
    case ${opt} in
        # @OPTION   -h displays usage
        h)
            __help
            exit 0
        ;;
        # @OPTION   -V displays version
        V)
            __version
            exit 0
        ;;
        *)
        ;;
    esac
done
