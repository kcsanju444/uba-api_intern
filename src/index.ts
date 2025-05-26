import express from "express";
import http from "http";
import compression from "compression";
import dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";
import { authenticate } from "./graphql/utils/auth";

import { makeExecutableSchema } from '@graphql-tools/schema';
import resolver from './graphql/resolver/employeeresolver'; 
import { typeDefs } from "graphql-scalars";
dotenv.config();


const schema = makeExecutableSchema({ typeDefs, resolvers: resolver });

async function main() {
  const app = express();
  app.use(compression());

  app.use(
    "/graphql",
    (req, res) =>
      graphqlHTTP({
        schema,
        graphiql: true,
        context: { user: authenticate(req) },
      })(req, res)
  );

  const httpServer = http.createServer(app);
  httpServer.listen(8080, () => {
    console.log("Server running on http://localhost:8080/graphql");
  });
}

main().catch(console.error);
