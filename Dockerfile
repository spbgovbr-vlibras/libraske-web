FROM node:18.16.0-bullseye

RUN apt-get update && apt-get install -y unzip zip ssh python3 curl git-core curl build-essential openssl libssl-dev --no-install-recommends

copy . /libraske/

WORKDIR /libraske/

RUN yarn install

EXPOSE 3000
#CMD yarn typeorm migration:run && yarn run dev
CMD yarn start
