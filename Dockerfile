#  Build stage
FROM node:lts-alpine as builder

ENV NODE_ENV=production
ARG WEATHERAPPID
ENV REACT_APP_WEATHERAPPID=${WEATHERAPPID}

WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN echo "$REACT_APP_WEATHERAPPID" > REACT_APP_WEATHERAPPID
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app

#  Runtime stage
FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
