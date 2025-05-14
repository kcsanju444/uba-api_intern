import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { User } from "./entities/userentities";
import { Internship } from "./entities/internshipentities";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST2,
  port: parseInt(process.env.DB_PORT2 || "3306"),
  username: process.env.DB_USERNAME2,
  password: process.env.DB_PASSWORD2,
  database: process.env.DB_NAME2,
  synchronize: false, 
  logging: true,
  entities: [User, Internship],
  migrations: ["src/migrations/*.ts"],
});
