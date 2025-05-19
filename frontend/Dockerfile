FROM node:20-alpine3.18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx tsc -b && npx vite build

EXPOSE 5173

CMD ["npm", "run", "dev"]
