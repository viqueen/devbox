#!/usr/bin/env bash

VIQUEEN_DEVBOX_HOME=$(cd "$(dirname "$0")" && pwd -P)

function config_box() {
    echo "export VIQUEEN_DEVBOX_HOME=${VIQUEEN_DEVBOX_HOME}" >> ~/.bashrc
    echo "export PATH=${PATH}:${VIQUEEN_DEVBOX_HOME}/cli/bin:~/bin" >> ~/.bashrc
    ln -sfnv "${VIQUEEN_DEVBOX_HOME}"/cli/.devboxrc ~/.devboxrc
    echo "source ~/.devboxrc" >> ~/.bashrc
}

function config_vim() {
  # setup vim
  ln -sfnv "${VIQUEEN_DEVBOX_HOME}"/cli/.vimrc ~/.vimrc
  ln -sfnv "${VIQUEEN_DEVBOX_HOME}"/.vim  ~/.vim
  git config --global core.editor "vim"
  vim +PluginInstall +qall
}

function config_prompt() {
    ln -sfnv "${VIQUEEN_DEVBOX_HOME}"/cli/.promptline.sh ~/.promptline.sh
    echo "source ~/.promptline.sh" >> ~/.bashrc
}

# shellcheck disable=SC2068
eval $@
