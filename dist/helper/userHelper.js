"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOne = exports.updateOne = exports.createOne = exports.findOne = exports.findAll = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = __importDefault(require("../graphql/db"));
const employeeQueries_1 = require("../graphql/query/employeeQueries");
const saltRounds = 10;
const findAll = async (_, res) => {
    db_1.default.query(employeeQueries_1.getAllEmployees, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Server Error', error: err });
        }
        const message = results.length ? 'Items fetched' : 'No items found';
        res.status(200).json({ success: true, message, data: results });
    });
};
exports.findAll = findAll;
const findOne = async (_, id, res) => {
    db_1.default.query(employeeQueries_1.getEmployeeById, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Server Error', error: err });
        }
        res.status(200).json({ success: true, message: 'Item fetched', data: results[0] });
    });
};
exports.findOne = findOne;
const createOne = async (_, data, res) => {
    try {
        const hashedPassword = await bcrypt_1.default.hash(data.password, saltRounds);
        const values = [
            data.name,
            data.email,
            hashedPassword,
            data.position,
            data.department,
            data.address,
            data.salary,
            data.image,
        ];
        db_1.default.query(employeeQueries_1.insertEmployee, values, (err, result) => {
            if (err) {
                return res.status(400).json({ message: 'Error creating item', error: err });
            }
            res.status(201).json({ success: true, message: 'Item created', data: { id: result.insertId, ...data } });
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error hashing password', error });
    }
};
exports.createOne = createOne;
const updateOne = async (_, id, data, res) => {
    try {
        const hashedPassword = data.password ? await bcrypt_1.default.hash(data.password, saltRounds) : data.password;
        const values = [
            data.name,
            data.email,
            hashedPassword,
            data.position,
            data.department,
            data.address,
            data.salary,
            data.image || null,
        ];
        db_1.default.query(employeeQueries_1.updateEmployeeById, [...values, id], (err, result) => {
            if (err) {
                return res.status(400).json({ message: 'Error updating item', error: err });
            }
            res.status(200).json({ success: true, message: 'Item updated', data: { id, ...data } });
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error hashing password', error });
    }
};
exports.updateOne = updateOne;
const deleteOne = async (_, id, res) => {
    db_1.default.query(employeeQueries_1.deleteEmployeeById, [id], (err, result) => {
        if (err) {
            return res.status(400).json({ message: 'Error deleting item', error: err });
        }
        res.status(204).json({ success: true, message: 'Item deleted' });
    });
};
exports.deleteOne = deleteOne;
