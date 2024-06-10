FROM node:${NODE_VERSION}

# Install buf \
RUN npm install --ignore-scripts -g @bufbuild/buf@1.31.0

# Install protoct-gen-ts
RUN npm install --ignore-scripts -g protoc-gen-ts@0.8.7


WORKDIR /workspace/schema