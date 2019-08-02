FROM node:10

WORKDIR /usr/src/app

# install ffmpeg for audio playback and python for node-gyp
RUN apt-get update && apt-get install -y ffmpeg python

COPY package*.json ./
RUN npm ci 

RUN apt-get purge -y python && apt-get clean

COPY . .

RUN npm run build

# remove source files to minimize image size
RUN rm -rf ./src

CMD ["node", "index.js"]
