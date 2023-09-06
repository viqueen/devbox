# @COMMAND _with_arguments [count] [...]        ensures the arguments count is at least as expected
_with_arguments() {
    count=${1}
    shift
    if [[ "$#" -lt ${count} ]]; then
        echo "missing arguments, expected at least ${count} but received $#"
        exit 1
    fi
}

# @COMMAND _join [delim] [elements]             joins elements with delimiter
_join() {
    _with_arguments 1 "$@"
    delim=$1
    shift
    output=$(printf -- "$delim%s" "${@}")
    echo "${output:1}"
}