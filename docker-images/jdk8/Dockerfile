FROM openjdk:8-alpine

ARG MAVEN_VERSION=3.5.4

RUN apk add --no-cache bash curl git vim ruby

# maven
RUN mkdir -p /usr/local/bin \
    && curl -s https://bitbucket.org/mjensen/mvnvm/raw/master/mvn > /usr/local/bin/mvn \
    && chmod 0755 /usr/local/bin/mvn \
    && echo "mvn_version=$MAVEN_VERSION" > mvnvm.properties \
    && mvn --version \
    && rm mvnvm.properties

# devbox
RUN mkdir -p ~/sources \
    && git clone https://github.com/viqueen/devbox.git ~/sources/devbox \
    && cd ~/sources/devbox \
    && ./setup.sh config_box \
    && ./setup.sh config_prompt \
    && ln -sfnv ~/.profile ~/.bashrc
