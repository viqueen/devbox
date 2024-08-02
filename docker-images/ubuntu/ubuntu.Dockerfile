FROM ubuntu:${UBUNTU_VERSION}

LABEL org.opencontainers.image.authors="viqueen"

RUN apt-get update \
    && apt-get install -y git vim curl \
    && apt-get clean

# nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash

# devbox, I still want my vim and prompts configured

RUN mkdir -p ~/sources \
    && git clone --recursive https://github.com/viqueen/devbox.git ~/sources/devbox \
    && cd ~/sources/devbox \
    && ./setup.sh config_box \
    && ./setup.sh config_prompt \
    && ./setup.sh config_vim
