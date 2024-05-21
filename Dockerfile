FROM node:18-alpine

ENV PUBLIC_PB_ENDPOINT="http://backend:8080"
ENV SRC_FOLDER="/src"
ENV PUBLIC_BUILD_STATIC=0

WORKDIR /src
COPY *.json ./
RUN npm install
COPY svelte-configs svelte-configs
COPY *.sh ./
COPY src ./src
COPY static ./static
COPY *.js ./
RUN npm run build
WORKDIR /crispypod
RUN cp -r /src/build-node /src/start-server.js /src/package.json /src/node_modules /crispypod
CMD [ "node","start-server.js" ]