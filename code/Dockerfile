FROM node:18.10.0

WORKDIR /usr/code

COPY package*.json ./

RUN npm install

EXPOSE 4200

CMD ["npm", "start"]
