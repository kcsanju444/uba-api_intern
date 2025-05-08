import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
<<<<<<< HEAD
  import { typeDefs } from './graphql/schema';  
import resolver from '../src/graphql/resolver/employeeresolver'; 
=======
import { typeDefs } from './graphql/schema';  // Import GraphQL schema
import resolver from '../src/graphql/resolver/employeeresolver';  // Import resolvers
>>>>>>> 6255d23d529bd9c4947994d5f56a50ab2aaafac6
import router from './router/router';

dotenv.config();

const app = express();
<<<<<<< HEAD

=======
app.use(cors({
    credentials: true,
}));
app.use(compression());
app.use(cookieParser());
>>>>>>> 6255d23d529bd9c4947994d5f56a50ab2aaafac6
app.use(bodyParser.json());

const server = http.createServer(app);
server.listen(8080, () => {
    console.log('Server running on http://localhost:8080/');
});
<<<<<<< HEAD

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: resolver,
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,  
}));

app.use('/api/auth', router);
=======

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
>>>>>>> 6255d23d529bd9c4947994d5f56a50ab2aaafac6

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
