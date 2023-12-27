FROM node:18-alpine

ENV BACK_END_URL="http://backend:8080"

ENV PUBLIC_FRONT_END_URL="http://localhost:3000"
WORKDIR /crispypod
COPY *.js *.json ./
COPY svelte-configs svelte-configs
COPY *.sh ./
COPY src ./src
COPY static ./static
RUN npm install && npm run build
CMD [ "node","build/index.js" ]