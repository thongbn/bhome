#FROM node:16
## Installing libvips-dev for sharp compatability
#RUN apt-get update && apt-get install libvips-dev -y
#ARG NODE_ENV=development
#ENV NODE_ENV=${NODE_ENV}
#WORKDIR /opt/app
#COPY ./package.json /opt/app
#COPY ./yarn.lock /opt/app
#RUN yarn config set network-timeout 600000 -g
#RUN yarn install
#COPY . /opt/app
#RUN yarn build
#EXPOSE 1337
#CMD ["yarn", "run", "start"]

FROM node:16-alpine
WORKDIR /opt/app
COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./lib ./lib
RUN yarn install
COPY . /opt/app
RUN yarn run build
EXPOSE 1337
ENV NODE_ENV production
CMD ["yarn", "run", "start"]
