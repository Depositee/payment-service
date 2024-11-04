FROM node:16.18-buster-slim

COPY . ./app

WORKDIR /app

RUN npm install

EXPOSE 50051

CMD ["npm", "run","start"]
