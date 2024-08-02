FROM maven:3.9.1-eclipse-temurin-11

RUN apt update \
    && wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash \
    && . ~/.bashrc \
    && nvm install 18.16.0 \
    && apt clean

RUN . ~/.bashrc \
    && npm install atlassian-devbox -g \
    && confluence install ${CONFLUENCE_VERSION}