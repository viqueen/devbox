FROM openjdk:${JDK_VERSION}

ARG MAVEN_VERSION=3.6.1

RUN apk add --no-cache bash curl git vim ruby

# maven
RUN mkdir -p /usr/local/bin \
    && curl -s https://bitbucket.org/mjensen/mvnvm/raw/master/mvn > /usr/local/bin/mvn \
    && chmod 0755 /usr/local/bin/mvn \
    && echo "mvn_version=$MAVEN_VERSION" > mvnvm.properties \
    && mvn --version \
    && rm mvnvm.properties

# atlassian sdk
RUN mkdir -p /tmp/downloads \
    && cd /tmp/downloads \
    && wget -O atlassian-plugin-sdk.tar.gz https://marketplace.atlassian.com/download/plugins/atlassian-plugin-sdk-tgz \
    && mkdir -p /opt/atlassian-plugin-sdk \
    && cd /opt/atlassian-plugin-sdk \
    && tar -xvf /tmp/downloads/atlassian-plugin-sdk.tar.gz --strip 1 \
    && rm -rf /tmp/downloads \
    && mkdir -p ~/sources/ATLAS

ENV PATH=${PATH}:/opt/atlassian-plugin-sdk/bin

# devbox
RUN mkdir -p ~/sources \
    && git clone --recursive https://github.com/viqueen/devbox.git ~/sources/devbox \
    && cd ~/sources/devbox \
    && ./setup.sh config_box \
    && ./setup.sh config_prompt \
    && ./setup.sh config_vim \
    && ln -sfnv ~/.profile ~/.bashrc

