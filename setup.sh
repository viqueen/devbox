#!/usr/bin/env bash

VIQUEEN_DEVBOX_HOME=$(cd "$(dirname "$0")" && pwd -P)

_shell_rc() {
  if [[ -n $ZSH_VERSION ]]; then
    echo "${HOME}/.zshrc"
  elif [[ -n $FSH_VERSION ]]; then
    echo "${HOME}/.fshrc"
  else # default to bash
    echo "${HOME}/.bashrc"
  fi
}

function config_box() {
    local -r rc_file=$(_shell_rc)
    echo "export VIQUEEN_DEVBOX_HOME=${VIQUEEN_DEVBOX_HOME}" >> "${rc_file}"
    echo "export PATH=${PATH}:${VIQUEEN_DEVBOX_HOME}/modules/cli/bin:${VIQUEEN_DEVBOX_HOME}/cli/bin:~/bin" >> "${rc_file}"
    ln -sfnv "${VIQUEEN_DEVBOX_HOME}"/cli/.devboxrc "${HOME}/.devboxrc"
    echo "source ~/.devboxrc" >> "${rc_file}"
}

function config_vim() {
  # setup vim
  ln -sfnv "${VIQUEEN_DEVBOX_HOME}"/cli/.vimrc "${HOME}/.vimrc"
  ln -sfnv "${VIQUEEN_DEVBOX_HOME}"/.vim  "${HOME}/.vim"
  git config --global core.editor "vim"
  vim +PluginInstall +qall
}

function config_prompt() {
    local -r rc_file=$(_shell_rc)
    ln -sfnv "${VIQUEEN_DEVBOX_HOME}"/cli/.promptline.sh "${HOME}/.promptline.sh"
    echo "source ${HOME}/.promptline.sh" >> "${rc_file}"
}

function config_nvm() {
    local -r rc_file=$(_shell_rc)
    ln -sfnv "${VIQUEEN_DEVBOX_HOME}"/cli/.nodevmrc "${HOME}/.nodevmrc"
    echo "source ${HOME}/.nodevmrc" >> "${rc_file}"
}

# shellcheck disable=SC2068
eval $@
