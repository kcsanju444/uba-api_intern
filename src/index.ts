import express from 'express';
import http from 'http';
import compression from 'compression';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from './graphql/schema';  // Import GraphQL schema
import resolver from '../src/graphql/resolver/employeeresolver';  // Import resolvers
import router from './router/router';

dotenv.config();

const app = express();


const server = http.createServer(app);
server.listen(8080, () => {
    console.log('Server running on http://localhost:8080/');
});

const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  throw new Error('MONGO_URL is not defined in .env');
}

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (error: Error) => {
  console.error('MongoDB connection error:', error);
});


// Set up GraphQL endpoint
const schema = makeExecutableSchema({
  typeDefs,
  resolvers: resolver, // Connect resolvers to the schema
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true, 
}));

app.use('/api/auth', router);