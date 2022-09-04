FROM maven:3.8.6-openjdk-18-slim

RUN apt-get update \
    && apt-get install -y file autoconf make unzip zip build-essential \
    && apt-get install -y libasound2-dev libcups2-dev libfontconfig1-dev libx11-dev libxext-dev \
    && apt-get install -y libxrender-dev libxrandr-dev libxtst-dev libxt-dev


RUN apt-get install -y git ant \
    && echo 'export ANT_HOME=/usr/share/ant' >> ~/.bashrc \
    && git clone https://github.com/jenv/jenv.git ~/.jenv \
    && echo 'export PATH="${HOME}/.jenv/bin:${PATH}"' >> ~/.bashrc \
    && echo 'eval "$(jenv init -)"' >> ~/.bashrc
