FROM maven:${JDK_VERSION}

RUN apt-get update \
    && apt-get install -y git wget \
    && wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash \
    && . ~/.bashrc \
    && nvm install 17.8.0 \
    && apt-get clean
