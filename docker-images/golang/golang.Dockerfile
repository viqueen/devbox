FROM golang:${GO_VERSION}

RUN apt-get update \
    && apt-get install -y git vim

# devbox, I still want my vim and prompts configured
RUN mkdir -p ~/sources \
    && git clone --recursive https://github.com/viqueen/devbox.git ~/sources/devbox \
    && cd ~/sources/devbox \
    && ./setup.sh config_box \
    && ./setup.sh config_prompt \
    && ./setup.sh config_vim
