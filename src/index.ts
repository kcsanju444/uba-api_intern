import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
  import { typeDefs } from './graphql/schema';  
import resolver from '../src/graphql/resolver/employeeresolver'; 
import router from './router/router';

dotenv.config();
const app = express();

app.use(bodyParser.json());

const server = http.createServer(app); 
server.listen(8080,()=>{
    console.log('server running on http://localhost:8080/');
});

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: resolver,
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,  
}));

app.use('/api/auth', router);

