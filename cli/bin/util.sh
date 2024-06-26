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

# @COMMAND _jiraIssueNumber                    extracts JIRA issue number from branch name
_jiraIssueNumber() {
    branch_name=$(git rev-parse --abbrev-ref HEAD);
    prefix="noissue";
    if [[ ${branch_name} =~ ^(.+/)?([A-Za-z]+-[0-9]+)(-(.*))?$ ]]; then
        prefix=${BASH_REMATCH[2]};
    fi;
    echo "${prefix}";
}