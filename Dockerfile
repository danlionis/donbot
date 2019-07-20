FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --only=prod

RUN apt-get update
RUN apt-get install -y ffmpeg
RUN apt-get clean

COPY . .

RUN npm run build

CMD ["node", "index.js"]
