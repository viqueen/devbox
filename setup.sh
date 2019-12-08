#!/usr/bin/env bash

VIQUEEN_DEVBOX_HOME=$(cd "$(dirname "$0")" && pwd -P)

function config_box() {
    if [[ -f ~/.bash_profile ]]; then
        ln -sfnv ~/.bash_profile ~/.profile
    fi

    echo "alias ll='ls -la'" >> ~/.profile
    echo "alias please=sudo" >> ~/.profile

    echo "export PS1='\u@\h\w'" >> ~/.profile
    echo "export CLICOLOR=1" >> ~/.profile
    echo "export LSCOLORS=GxFxCxDxBxegedabagaced" >> ~/.profile

    echo "export VIQUEEN_DEVBOX_HOME=${VIQUEEN_DEVBOX_HOME}" >> ~/.profile
    echo "export PATH=${PATH}:${VIQUEEN_DEVBOX_HOME}/bin:~/bin" >> ~/.profile
    # setup maven
    echo 'export MAVEN_OPTS="-Xms1680m -Xmx2048m -XX:MaxMetaspaceSize=384m -XX:MaxPermSize=384m"' >> ~/.profile

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
    echo "source ~/.shell_prompt.sh" >> ~/.profile
}

eval $@
