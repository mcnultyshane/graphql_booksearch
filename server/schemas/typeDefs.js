const { gql } = require ('apollo-server-express');

// Create TypeDefs

const typeDefs = gql`
    type Book {
        _id: ID
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }
    type User {
        _id; ID
        username: String
        email: String
        bookCount: Int
        savedBooks; [Book]
    }
    type Auth {
        token: ID!
        user: User
    }
    type Query {
        me: User
    }
    type Mutation {
        
    }
    input SavedBookInput {

    }
`;

// export the typeDefs
module.exports = typeDefs;
