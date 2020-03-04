#!/bin/sh
./node_modules/.bin/knex migrate:latest --env development
echo Setting up Migrations
sleep 3
./node_modules/.bin/knex seed:run --env development
echo Setting up Seeds ... 
sleep 3
echo Starting Server ...
yarn start
