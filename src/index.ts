import express from "express";
import http from "http";
import compression from "compression";
import dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { typeDefs } from "./graphql/schema";
import resolver from "../src/graphql/resolver/employeeresolver";

import router from "./router/router";
// import userroutes from "./router/internroutes";

import { AppDataSource } from "./data-source";

dotenv.config();

const app = express();
app.use(compression());

AppDataSource.initialize()
  .then(() => {
    console.log("TypeORM Data Source initialized");

    const server = http.createServer(app);
    server.listen(8080, () => {
      console.log("Server running on http://localhost:8080/");
    });

    const schema = makeExecutableSchema({
      typeDefs,
      resolvers: resolver,
    });

    app.use(
      "/graphql",
      graphqlHTTP({
        schema: schema,
        graphiql: true,
      })
    );

    app.use("/api/auth", router);

    // app.use("/api/users", userroutes);
  })
  .catch((error) => {
    console.error("Error during Data Source initialization", error);
  });
