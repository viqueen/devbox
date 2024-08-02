FROM openjdk:${JDK_VERSION}

ARG MAVEN_VERSION=3.6.3
ARG NODE_VERSION=v12.16.2

RUN apk add curl wget bash nodejs nodejs-npm \
    && apk cache clean

SHELL ["/bin/bash", "-c"]

# maven
RUN mkdir -p /usr/local/bin \
    && curl -s https://bitbucket.org/mjensen/mvnvm/raw/master/mvn > /usr/local/bin/mvn \
    && chmod 0755 /usr/local/bin/mvn \
    && echo "mvn_version=$MAVEN_VERSION" > mvnvm.properties \
    && mvn --version \
    && rm mvnvm.properties