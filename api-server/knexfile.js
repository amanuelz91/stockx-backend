require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      // host : '127.0.0.0',
      // host : '127.0.0.1',
      // host : 'postgres',
      host : 'db',
      user : process.env.PG_USER,
     password : process.env.PG_PASSWORD,
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
    //  host : '127.0.0.0',
    //  host : '127.0.0.1',
      // host : 'postgres',
     host : 'db',
    //  user : 'amanuel',
     user : process.env.PG_USER,
     password : process.env.PG_PASSWORD,
     database : process.env.PG_PASSWORD
   },
   migrations: {
      directory: './src/database/migrations',
    },
    seeds: { directory: './src/database/seeds' },
  },

  production: {
    client: 'pg',
    connection: {
      // host : '127.0.0.0',
      // host : '127.0.0.1',
      // host : 'postgres',
      host : 'db',
     user : process.env.PG_USER,
     password : process.env.PG_PASSWORD,
     database : 'dockerstockx_prod'
    },
    migrations: {
      directory: './src/database/migrations',
    },
    seeds: { directory: './src/database/seeds' },
  },
};

