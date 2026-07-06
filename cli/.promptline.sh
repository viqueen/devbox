#!/usr/bin/env bash
#
# workspace-aware prompt using starship
#

__devbox_detect_workspace() {
  local primary_org="${VIQUEEN_DEVBOX_PRIMARY_ORG:-safetyculture}"
  local secondary_org="${VIQUEEN_DEVBOX_SECONDARY_ORG:-labset}"

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

# starship config
export STARSHIP_CONFIG="${VIQUEEN_DEVBOX_HOME}/cli/starship.toml"

# init starship with workspace detection hook
if [[ -n ${ZSH_VERSION-} ]]; then
  precmd_functions+=(__devbox_detect_workspace)
  eval "$(starship init zsh)"
else
  starship_precmd_user_func="__devbox_detect_workspace"
  eval "$(starship init bash)"
fi
