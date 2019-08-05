FROM node:10-alpine

WORKDIR /usr/src/app

# install ffmpeg for audio playback and python for node-gyp
# RUN apt-get update && apt-get install -y ffmpeg python
RUN apk add --no-cache ffmpeg python make g++

COPY package*.json ./
RUN npm ci

# RUN apt-get purge -y python && apt-get autoremove -y && apt-get clean

COPY . .

RUN npm run build

RUN apk del python make g++

# remove source files to minimize image size
RUN rm -rf ./src /typings

CMD ["npm", "start"]
