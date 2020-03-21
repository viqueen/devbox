#!/usr/bin/env bash

VIQUEEN_DEVBOX_HOME=$(cd "$(dirname "$0")" && pwd -P)

function config_box() {
    echo "alias ll='ls -la'" >> ~/.bashrc
    echo "alias please=sudo" >> ~/.bashrc

    echo "export PS1='\u@\h\w'" >> ~/.bashrc
    echo "export CLICOLOR=1" >> ~/.bashrc
    echo "export LSCOLORS=GxFxCxDxBxegedabagaced" >> ~/.bashrc

    echo "export VIQUEEN_DEVBOX_HOME=${VIQUEEN_DEVBOX_HOME}" >> ~/.bashrc
    echo "export PATH=${PATH}:${VIQUEEN_DEVBOX_HOME}/bin:~/bin" >> ~/.bashrc

    # setup maven
    echo 'export MAVEN_OPTS="-Xms1680m -Xmx2048m -XX:MaxMetaspaceSize=384m -XX:MaxPermSize=384m"' >> ~/.bashrc

    # setup pretty git log
    git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
}

function config_vim() {
  # setup vim
  ln -sfnv ${VIQUEEN_DEVBOX_HOME}/.vimrc ~/.vimrc
  ln -sfnv ${VIQUEEN_DEVBOX_HOME}/.vim  ~/.vim
  git config --global core.editor "vim"
  vim +PluginInstall +qall
}

function config_prompt() {
    ln -sfnv ${VIQUEEN_DEVBOX_HOME}/.shell_prompt.sh ~/.shell_prompt.sh
    echo "source ~/.shell_prompt.sh" >> ~/.bashrc
}

eval $@
