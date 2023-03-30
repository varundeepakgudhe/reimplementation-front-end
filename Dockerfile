FROM node:18.15.0-alpine

LABEL maintainer="Ankur Mundra <ankurmundra0212@gmail.com>"
# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
COPY src .

CMD [ "npm", "run", "start" ]