FROM node:${NODE_VERSION}

ARG NVM_VERSION=v0.39.1

RUN apt-get update \
    && apt-get install -y git vim curl unzip wget ruby \
    && apt-get clean

# NVM
RUN wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/${NVM_VERSION}/install.sh | bash

# devbox
RUN mkdir -p ~/sources \
    && git clone --recursive https://github.com/viqueen/devbox.git ~/sources/devbox \
    && cd ~/sources/devbox \
    && ./setup.sh config_box \
    && ./setup.sh config_prompt \
    && ./setup.sh config_vim
