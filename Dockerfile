FROM node:latest

WORKDIR /hsipl_account_system
COPY package*.json /
RUN npm install

COPY . .


# CMD ["npm","start"]
