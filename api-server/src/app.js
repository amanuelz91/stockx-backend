require('dotenv').config()

const { ApolloServer } = require('apollo-server');

const store = require('./database/knex')
const { ShoeAPI } = require('./datasources')

const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')

const dataSources = () => ({
    shoeAPI: new ShoeAPI({store})
});

const context = async ({ req }) => {}

const server = new ApolloServer({ 
    typeDefs, 
    context, 
    resolvers, 
    dataSources,
    introspection: true
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });

