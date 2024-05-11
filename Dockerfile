FROM node:4.17.1

WORKDIR /hsipl_account_system
COPY package*.json /
RUN npm install
COPY . .
CMD ["npm","run","dev"]
