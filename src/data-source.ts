import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config();

export const AppDataSource   = new DataSource({
    type:"postgres",
    host: process.env.DB_HOST2,
  port: Number(process.env.DB_PORT2),
  username: process.env.DB_USERNAME2,
  password: process.env.DB_PASSWORD2,
  database: process.env.DB_NAME2,
  synchronize: true,
    logging: true,
    entities: ["src/entities/*.ts"],
  migrations: ["src/migrations/*.ts"],
})