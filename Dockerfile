FROM node:18-alpine

ARG BACKEND_URL="http://backend:8080"
ENV BACK_END_URL=${BACKEND_URL}

ARG FRONTEND_URL="http://localhost:4173"
ENV PUBLIC_FRONT_END_URL=${FRONTEND_URL}
WORKDIR /crispypod
VOLUME [ "/crispypod/UploadFile" ]
COPY *.js *.json ./
COPY svelte-configs svelte-configs
COPY build.sh build.sh
COPY src ./src
COPY static ./static
RUN npm install && npm run build
CMD [ "npm run preview" ]