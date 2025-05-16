"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../graphql/db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const employeeQueries_1 = require("../query/employeeQueries");
const resolver = {
    Query: {
        employeeList() {
            return new Promise((resolve, reject) => {
                db_1.default.query(employeeQueries_1.getAllEmployees, (err, result) => {
                    if (err)
                        reject(new Error('Database error: ' + err.message));
                    else
                        resolve(result);
                });
            });
        },
        employee(_, args) {
            return new Promise((resolve, reject) => {
                db_1.default.query(employeeQueries_1.getEmployeeById, [args.id], (err, results) => {
                    if (err)
                        reject(new Error('Database error: ' + err.message));
                    else
                        resolve(results[0]);
                });
            });
        },
    },
    Mutation: {
        addEmployee: async (_, args) => {
            const { name, email, password, position, department, address, salary, image, } = args.input;
            const hashedPassword = await bcrypt_1.default.hash(password, 10);
            return new Promise((resolve, reject) => {
                db_1.default.query(employeeQueries_1.insertEmployee, [name, email, hashedPassword, position, department, address, salary, image], (err, results) => {
                    if (err)
                        reject(new Error('Database error: ' + err.message));
                    else {
                        resolve({
                            id: results.insertId,
                            name,
                            email,
                            password: hashedPassword,
                            position,
                            department,
                            address,
                            salary,
                            image,
                        });
                    }
                });
            });
        },
        updateEmployee: async (_, { id: employeeId, updates }) => {
            const { name, email, password, position, department, address, salary, image, } = updates;
            const hashedPassword = password ? await bcrypt_1.default.hash(password, 10) : undefined;
            return new Promise((resolve, reject) => {
                db_1.default.query(employeeQueries_1.updateEmployeeById, [
                    name,
                    email,
                    hashedPassword || password,
                    position,
                    department,
                    address,
                    salary,
                    image,
                    employeeId,
                ], (err, result) => {
                    if (err)
                        reject(new Error('Database error: ' + err.message));
                    else {
                        resolve({
                            id: employeeId,
                            name,
                            email,
                            password: hashedPassword || password,
                            position,
                            department,
                            address,
                            salary,
                            image,
                        });
                    }
                });
            });
        },
        deleteEmployee: (_, args) => {
            return new Promise((resolve, reject) => {
                const { id } = args;
                db_1.default.query(employeeQueries_1.deleteEmployeeById, [id], (err, result) => {
                    if (err)
                        reject(new Error('Database error: ' + err.message));
                    else
                        resolve(result.affectedRows > 0);
                });
            });
        },
    },
};
exports.default = resolver;
