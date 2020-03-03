require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
     host : '127.0.0.1',
     user : 'amanuel',
     password : 'amanuel',
     database : 'dockerstockx_dev'
   },
   migrations: {
      directory: './src/database/migrations',
    },
    seeds: { directory: './src/database/seeds' },
  },

  test: {
    client: 'pg',
    connection: {
     host : '127.0.0.1',
     user : 'amanuel',
     password : 'amanuel',
     database : 'dockerstockx_test'
   },
   migrations: {
      directory: './src/database/migrations',
    },
    seeds: { directory: './src/database/seeds' },
  },

  production: {
    client: 'pg',
    connection: {
     host : '127.0.0.1',
     user : 'amanuel',
     password : 'amanuel',
     database : 'dockerstockx_prod'
    },
    migrations: {
      directory: './src/database/migrations',
    },
    seeds: { directory: './src/database/seeds' },
  },
};

