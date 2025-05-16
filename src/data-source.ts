import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/userentities";
import { Internship } from "./entities/internshipentities";

export const AppDataSource = new DataSource({
  type: "mysql",          // keep this as "mysql"
  host: "localhost",
  port: 3307,
  username: "root",
  password: "123456",
  database: "internship_db",
  synchronize: false,
  logging: true,
  entities: [User, Internship],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
  // No need for extra authPlugins here if using mysql2 package
});
