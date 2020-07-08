FROM node:13.5.0

WORKDIR /usr/source/app
COPY package.json .
RUN yarn install
COPY . .

CMD [ "yarn", "dev" ]