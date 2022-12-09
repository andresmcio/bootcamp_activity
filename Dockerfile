FROM node:16
WORKDIR /app
COPY package*.json ./
COPY ./src ./src
RUN npm install
EXPOSE 12345
CMD [ "npm", "test" ]