FROM maven:3.8.6-openjdk-18-slim

RUN apt-get update \
    && apt-get install -y git \
    && git clone https://github.com/jenv/jenv.git ~/.jenv

RUN echo 'export PATH="${HOME}/.jenv/bin:${PATH}"' >> ~/.bashrc \
    && echo 'eval "$(jenv init -)"' >> ~/.bashrc
