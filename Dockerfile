FROM node:14.17.6-alpine
ENV NODE_ENV=development

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install -g npm
RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm", "run", "start-dev" ]
