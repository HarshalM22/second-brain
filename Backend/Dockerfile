FROM node:20-slim

WORKDIR /src

RUN apt-get update && apt-get install -y \
    openssl \
    curl \
    bash \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm install

COPY . .



RUN npx prisma generate
RUN npm run build 

EXPOSE 3000

CMD [ "npm","run","dev:docker"]
