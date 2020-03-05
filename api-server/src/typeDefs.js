const { gql } = require('apollo-server');

const typeDefs = gql`
    type Shoe{
        id: Int
        name: String
        true_to_size_avg: String
        count: Int
    }

    type Query {
        getAllShoes: [Shoe]
        getShoeByName(name: String): Shoe
    }

    input TrueToSizeCreator{
        name: String!
        true_to_size: Int!
    }

    type TrueToSizeUpdateResponse{
        success: Boolean!
        shoe: Shoe
    }

    type Mutation{
        updateTrueToSize(input:TrueToSizeCreator):TrueToSizeUpdateResponse!
    } 

        
`

module.exports = typeDefs