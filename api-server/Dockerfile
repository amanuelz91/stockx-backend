FROM node:13
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install
COPY . .
EXPOSE 3000
RUN ./node_modules/.bin/knex migrate:latest --env development
RUN ./node_modules/.bin/knex seed:run --env development
RUN yarn start
CMD ["./wait-for-it.sh", "-t", "60", "db:5432", "--", "./setup.sh"]
