const express = require('express')
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth')

// Set up express server
const app = express();
const PORT = process.env.PORT || 3001;

// Create a new Apollo server and pass in the schema data 
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
});

// integrate Apollo server with teh Express apllication as middleware
server.applyMiddleware({ app });

// Express middleware for parsing
app.use(express.urlendcoded({ extended: false}));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build'))
    );
}

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });