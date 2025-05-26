"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const userentities_1 = require("./entities/userentities");
const internshipentities_1 = require("./entities/internshipentities");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3307,
    username: "root",
    password: "123456",
    database: "internship_db",
    synchronize: false,
    logging: true,
    entities: [userentities_1.User, internshipentities_1.Internship],
    migrations: ["src/migrations/*.ts"],
    subscribers: [],
});
