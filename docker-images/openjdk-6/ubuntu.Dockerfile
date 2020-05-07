FROM ubuntu:${UBUNTU_VERSION}

MAINTAINER viqueen

# https://openjdk.java.net/install/#jdk6_ubuntu
RUN apt-get update \
    && apt-get install -y openjdk-6-jdk

RUN apt-get install -y maven ant