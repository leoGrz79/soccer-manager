FROM node:16.14-alpine

WORKDIR /app-backend

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3001

ENTRYPOINT ["npm", "run"]

CMD ["dev"]