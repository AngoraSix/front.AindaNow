# Dockerfile
FROM node:14-slim as builder
WORKDIR /opt/front.aindanow
COPY . .
ARG BUILD
ENV AN_APP_BUILD $BUILD
RUN npm install --production
RUN npm run build
EXPOSE 80
ENTRYPOINT [ "npm", "run", "start:prod" ]
CMD [ ]