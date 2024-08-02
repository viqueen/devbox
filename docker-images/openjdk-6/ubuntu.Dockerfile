FROM ubuntu:${UBUNTU_VERSION}

LABEL org.opencontainers.image.authors="viqueen"

# https://openjdk.java.net/install/#jdk6_ubuntu
RUN apt-get update \
    && apt-get install -y openjdk-6-jdk \
    && apt-get clean

RUN apt-get install -y maven ant vim \
    && apt-get clean