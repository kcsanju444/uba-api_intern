import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/userentities";
import { Internship } from "./entities/internshipentities";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as any || "mysql",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "internship_db",
  synchronize: false,
  logging: true,
  entities: [User, Internship],
  migrations: ["src/migrations/*.ts"],
});
