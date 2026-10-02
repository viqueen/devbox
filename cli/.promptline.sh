#!/usr/bin/env bash
#
# workspace-aware prompt (no external dependencies)
#
# colors match the original promptline / starship workspace palette:
#   viqueen workspace   -> orange (fg:220 bg:166)
#   primary org         -> purple (fg:135 bg:55)
#   secondary org       -> blue   (fg:110 bg:20)
#   home                -> green  (fg:231 bg:35)
#   elsewhere (default) -> red    (fg:231 bg:124)
#

__devbox_detect_workspace() {
  local primary_org="${VIQUEEN_DEVBOX_PRIMARY_ORG:-labset}"
  local secondary_org="${VIQUEEN_DEVBOX_SECONDARY_ORG:-docker}"

  if [[ -n "$DEVBOX_WORKSPACES_ROOT" ]]; then
    case "$PWD" in
      "$DEVBOX_WORKSPACES_ROOT"/viqueen*)          export DEVBOX_WORKSPACE="viqueen" ;;
      "$DEVBOX_WORKSPACES_ROOT"/"$primary_org"*)   export DEVBOX_WORKSPACE="primary" ;;
      "$DEVBOX_WORKSPACES_ROOT"/"$secondary_org"*) export DEVBOX_WORKSPACE="secondary" ;;
      "$HOME"*)                                    export DEVBOX_WORKSPACE="home" ;;
      *)                                           export DEVBOX_WORKSPACE="default" ;;
    esac
  elif [[ "$PWD" == "$HOME"* ]]; then
    export DEVBOX_WORKSPACE="home"
  else
    export DEVBOX_WORKSPACE="default"
  fi
  return 0
}

# cache workspaces root
export DEVBOX_WORKSPACES_ROOT="${DEVBOX_WORKSPACES_ROOT:-$(git config labset.workspaces.root 2>/dev/null)}"

__devbox_prompt_dir() {
  local dir_limit=3
  local truncation="⋯"
  local part_count=0
  local formatted=""
  local tilde="~"
  local cwd="${PWD/#$HOME/$tilde}"
  local first_char

  if [[ -n ${ZSH_VERSION-} ]]; then
    first_char=${cwd[1,1]}
  else
    first_char=${cwd::1}
  fi
  cwd="${cwd#\~}"

  while [[ "$cwd" == */* && "$cwd" != "/" ]]; do
    local part="${cwd##*/}"
    cwd="${cwd%/*}"
    formatted="/$part$formatted"
    part_count=$((part_count + 1))
    if [[ $part_count -eq $dir_limit ]]; then
      first_char="$truncation"
      break
    fi
  done

  printf "%s" "$first_char$formatted"
}

__devbox_prompt_git_branch() {
  hash git 2>/dev/null || return 1
  local branch
  branch=$(git symbolic-ref --quiet --short HEAD 2>/dev/null) || branch=$(git rev-parse --short HEAD 2>/dev/null) || return 1
  printf "%s" "$branch"
}

__devbox_prompt_render() {
  local exit_code=$?
  __devbox_detect_workspace

  local wrap end_wrap esc
  esc=$'\033['
  if [[ -n ${ZSH_VERSION-} ]]; then
    wrap='%{' end_wrap='%}'
  else
    wrap='\[' end_wrap='\]'
  fi

  # sgr fg [bg] -> non-printing-safe escape that resets, then sets fg (and bg if given)
  __devbox_sgr() {
    local fg="$1" bg="$2" code="0;38;5;${1}"
    [[ -n "$bg" ]] && code="${code};48;5;${bg}"
    printf '%s%s%sm%s' "$wrap" "$esc" "$code" "$end_wrap"
  }

  local reset
  reset="${wrap}${esc}0m${end_wrap}"

  local host_fg host_bg
  case "$DEVBOX_WORKSPACE" in
    viqueen)   host_fg=220 host_bg=166 ;;
    primary)   host_fg=135 host_bg=55  ;;
    secondary) host_fg=110 host_bg=20  ;;
    home)      host_fg=231 host_bg=35  ;;
    *)         host_fg=231 host_bg=124 ;;
  esac

  local host="${VIQUEEN_DEVBOX_MACHINE:-$(hostname -s)}"
  local prompt=""

  # workspace host segment -> username segment
  prompt+="$(__devbox_sgr "$host_fg" "$host_bg") ${host} "
  prompt+="$(__devbox_sgr "$host_bg" 31)"

  # username segment -> directory segment
  prompt+="$(__devbox_sgr 231 31) ${USER} "
  prompt+="$(__devbox_sgr 31 240)"

  # directory segment -> git branch segment
  prompt+="$(__devbox_sgr 250 240) $(__devbox_prompt_dir) "
  prompt+="$(__devbox_sgr 240 236)"

  local branch git_symbol=$''
  if branch=$(__devbox_prompt_git_branch); then
    # git branch segment -> end of line
    prompt+="$(__devbox_sgr 114 236) ${git_symbol} ${branch} "
    prompt+="$(__devbox_sgr 236)"
  else
    prompt+="$(__devbox_sgr 240)"
  fi

  if [[ $exit_code -ne 0 ]]; then
    prompt+="${reset}$(__devbox_sgr 196) ${exit_code}"
  fi

  prompt+="${reset}"$'\n'

  if [[ $exit_code -eq 0 ]]; then
    prompt+="$(__devbox_sgr 34)❯ ${reset}"
  else
    prompt+="$(__devbox_sgr 196)❯ ${reset}"
  fi

  printf "%s" "$prompt"
}

if [[ -n ${ZSH_VERSION-} ]]; then
  __devbox_prompt_precmd() { PROMPT="$(__devbox_prompt_render)"; }
  if [[ ! ${precmd_functions[(r)__devbox_prompt_precmd]} == __devbox_prompt_precmd ]]; then
    precmd_functions+=(__devbox_prompt_precmd)
  fi
else
  __devbox_prompt_precmd() { PS1="$(__devbox_prompt_render)"; }
  if [[ ! "$PROMPT_COMMAND" == *__devbox_prompt_precmd* ]]; then
    PROMPT_COMMAND='__devbox_prompt_precmd;'$'\n'"$PROMPT_COMMAND"
  fi
fi
