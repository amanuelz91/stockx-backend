
# StockX Backend

## Instructions 

## Setup
 
The container runs a database service called db and an api service called web. To run the service type the following command in your terminal 

`docker-compose up`

This will start an API server on localhost:3000

## Run Tests

1. Enter Docker CLI: `docker exec -it stockx-backend_web_1 /bin/bash`
2. Run Test: `yarn test`

## API

The API Endpoints are as follows

| Type | Endpoint |     Params      | Requirement | Options |
|------|----------|-----------------|-------------|---------|
| GET  | /shoes   | shoeName    | Optional    |["yeezy", "nike mag"] *case insensitive* | 
| POST | /shoes/true_to_size| shoeName <br> true_to_size | Required <br> Required | ["yeezy", "nike mag"] *case insensitive* <br> [1,2,3,4,5] |
