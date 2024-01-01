FROM node:18-alpine

ENV BACK_END_URL="http://backend:8080"
ENV SRC_FOLDER="/src"

WORKDIR /src
COPY *.js *.json ./
RUN npm install
COPY svelte-configs svelte-configs
COPY *.sh ./
COPY src ./src
COPY static ./static
RUN npm run build
WORKDIR /crispypod
RUN cp -r /src/build-node /src/package.json /src/node_modules /crispypod
CMD [ "node","build-node/index.js" ]