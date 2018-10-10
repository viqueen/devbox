#!/usr/bin/env bash

function init_mac() {
    # home_brew
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

    # terminal wisdom
    brew install cowsay
    brew install fortune
    echo "fortune | cowsay" >> ~/.bash_profile
}

# require jdk being installed first
function init_tools() {
    brew install jenv

    brew install mvnvm
    mvn --version

    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
    nvm install node
}

function config_box() {
    if [ -f ~/.bash_profile ]; then
        ln -sfnv ~/.bash_profile ~/.profile
    fi

    VIQUEEN_DEVBOX_HOME=$(cd "$(dirname "$0")" && pwd -P)
    echo "export VIQUEEN_DEVBOX_HOME=${VIQUEEN_DEVBOX_HOME}" >> ~/.profile
    echo "export PATH=${PATH}:${VIQUEEN_DEVBOX_HOME}/bin" >> ~/.profile

    # setup maven
    echo 'export MAVEN_OPTS="-Xms1680m -Xmx2048m -XX:MaxMetaspaceSize=384m -XX:MaxPermSize=384m"' >> ~/.profile

    # setup pretty git log
    git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
}