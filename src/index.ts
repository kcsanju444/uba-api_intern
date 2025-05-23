import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from './graphql/schema';  // Import GraphQL schema
import resolver from '../src/graphql/resolver/employeeresolver';  // Import resolvers
import router from './router/router';

dotenv.config();

const app = express();
app.use(cors({
    credentials: true,
}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

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
  graphiql: true,  // Enable GraphiQL for testing queries
}));

// Existing routes
app.use('/api/auth', router);
