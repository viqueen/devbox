FROM node:24.12.0-alpine

ENV PATH="/root/.local/bin:${PATH}"

RUN apk --no-cache add bash git vim curl \
    && curl https://mise.run | sh \
    && mkdir -p ~/sources \
    && git clone --recursive https://github.com/viqueen/devbox.git ~/sources/devbox \
    && cd ~/sources/devbox \
    && mise install \
    && ./setup.sh config_box \
    && ./setup.sh config_prompt \
    && ./setup.sh config_vim \
    && pnpm install --frozen-lockfile \
    && addgroup -S nonroot \
    && adduser -S nonroot -G nonroot

USER nonroot
