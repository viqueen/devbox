FROM maven:${JDK_VERSION}

RUN apt-get update \
    && apt-get install -y git nodejs npm
