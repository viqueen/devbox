#!/usr/bin/env bash

VIQUEEN_DEVBOX_HOME=$(cd "$(dirname "$0")" && pwd -P)

function init_mac() {
    # home_brew
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

    # terminal wisdom
    brew install cowsay
    brew install fortune
    echo "fortune | cowsay" >> ~/.bash_profile
}


function init_tools() {
    # require jdk being installed first
    brew install jenv

    brew install mvnvm
    mvn --version

    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
    nvm install node

    brew tap bazelbuild/tap
    brew tap-pin bazelbuild/tap
    brew install bazel

    brew install ant
    brew install gradle

}

function init_sdks() {
    # atlassian
    brew tap atlassian/tap
    brew install atlassian/tap/atlassian-plugin-sdk
    echo "export ATLAS_MVN=$(which mvn)" >> ~/.profile

    # mobile
    brew install android-sdk
    brew install android-ndk
}

function config_box() {
    if [ -f ~/.bash_profile ]; then
        ln -sfnv ~/.bash_profile ~/.profile
    fi

    echo "export VIQUEEN_DEVBOX_HOME=${VIQUEEN_DEVBOX_HOME}" >> ~/.profile
    echo "export PATH=${PATH}:${VIQUEEN_DEVBOX_HOME}/bin" >> ~/.profile

    # setup maven
    echo 'export MAVEN_OPTS="-Xms1680m -Xmx2048m -XX:MaxMetaspaceSize=384m -XX:MaxPermSize=384m"' >> ~/.profile

    # setup pretty git log
    git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
}

function config_vim() {
    # install vundle
    git clone https://github.com/VundleVim/Vundle.vim.git .vim/bundle/Vundle.vim

    # setup vim
    ln -sfnv ${VIQUEEN_DEVBOX_HOME}/.vimrc ~/.vimrc
    ln -sfnv ${VIQUEEN_DEVBOX_HOME}/.vim  ~/.vim

    git config --global core.editor vim
    vim +PluginInstall +qall
}

function config_prompt() {
    ln -sfnv ${VIQUEEN_DEVBOX_HOME}/.shell_prompt.sh ~/.shell_prompt.sh
    echo "source ~/.shell_prompt.sh" >> ~/.profile
}

eval $@