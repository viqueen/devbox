FROM node:18.16.1-alpine

ARG NVM_VERSION=v0.39.3

RUN apk add bash git vim

# NVM
RUN wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/${NVM_VERSION}/install.sh | bash

# devbox
RUN mkdir -p ~/sources \
    && git clone --recursive https://github.com/viqueen/devbox.git ~/sources/devbox \
    && cd ~/sources/devbox \
    && ./setup.sh config_box \
    && ./setup.sh config_prompt \
    && ./setup.sh config_vim \
    && yarn

RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot

USER nonroot
