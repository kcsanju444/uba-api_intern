"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployeeById = exports.updateEmployeeById = exports.insertEmployee = exports.getEmployeeById = exports.getAllEmployees = void 0;
exports.getAllEmployees = 'SELECT * FROM employee';
exports.getEmployeeById = 'SELECT * FROM employee WHERE id = ?';
exports.insertEmployee = 'INSERT INTO employees (name, email, password, position, department, address, salary, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
;
exports.updateEmployeeById = `
  UPDATE employee SET 
    name = ?, 
    email = ?, 
    password = ?, 
    position = ?, 
    department = ?, 
    address = ?, 
    salary = ?, 
    image = ?
  WHERE id = ?
`;
exports.deleteEmployeeById = 'DELETE FROM employee WHERE id = ?';
