import "reflect-metadata";
import express, { Application } from "express";
import http from "http";
import compression from "compression";
import dotenv from "dotenv";
import { buildSchema } from "type-graphql";
import { graphqlHTTP } from "express-graphql";

import { UserResolver, InternshipResolver } from "./graphql/resolver/typeormreslver";
import { AppDataSource } from "./data-source";
import router from "./router/router";

dotenv.config();

async function main() {
  // Initialize DB connection
  await AppDataSource.initialize();
  console.log("TypeORM Data Source initialized");

  // Build GraphQL schema with resolvers
  const schema = await buildSchema({
    resolvers: [UserResolver, InternshipResolver],
  });

  // Create Express app and type explicitly
  const app: Application = express();
  app.use(compression());

  // Apply GraphQL middleware (without Apollo)
  app.use(
    "/graphql",
    graphqlHTTP({
      schema: schema,
      graphiql: true, // enables the GraphiQL UI at /graphql
    })
  );

  // Your other REST routes
  app.use("/api/auth", router);

  // Create HTTP server and listen
  const httpServer = http.createServer(app);
  httpServer.listen(8080, () => {
    console.log("Server running on http://localhost:8080/graphql");
  });
}

main().catch((error) => {
  console.error("Error starting server:", error);
});