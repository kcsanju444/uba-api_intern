"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usercntroller_1 = require("../controller/usercntroller");
const db_1 = __importDefault(require("../graphql/db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// import {
//   deleteEmployeeById,
//   getAllEmployees,
//   getEmployeeById,
//   insertEmployee,
//   updateEmployeeById,
// } from "../graphql/query/employeeQueries";
jest.mock("../graphql/db", () => ({
    __esModule: true,
    default: {
        query: jest.fn(),
    },
}));
jest.mock("bcrypt", () => ({
    __esModule: true,
    default: {
        hash: jest.fn(),
    },
    hash: jest.fn(),
}));
describe("User Controller Tests", () => {
    let req;
    let res;
    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        db_1.default.query.mockClear();
        bcrypt_1.default.hash.mockClear();
    });
    it("should return all users if found", async () => {
        const mockUsers = [
            {
                id: 1,
                name: "Sanju",
                email: "sanju@example.com",
                password: "securepass",
                position: "Developer",
                department: "Engineering",
                address: "Kathmandu, Nepal",
                salary: 50000.0,
                image: "profile1.jpg",
            },
        ];
        db_1.default.query.mockImplementation((sql, callback) => {
            callback(null, mockUsers);
        });
        await (0, usercntroller_1.getUsers)(req, res);
        // expect(db.query).toHaveBeenCalledWith(getAllEmployees, expect.any(Function));
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: "Items fetched",
            data: mockUsers,
        });
    });
    it("should return 'No items found' when result is empty", async () => {
        db_1.default.query.mockImplementation((sql, callback) => {
            callback(null, []);
        });
        await (0, usercntroller_1.getUsers)(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: "No items found",
            data: [],
        });
    });
    it("should handle database errors", async () => {
        const error = new Error("Database error");
        db_1.default.query.mockImplementation((sql, callback) => {
            callback(error, null);
        });
        await (0, usercntroller_1.getUsers)(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: "Server Error",
            error,
        });
    });
    it("should handle error when getting users fails", async () => {
        db_1.default.query.mockImplementation((sql, callback) => {
            callback(new Error("DB error"), null);
        });
        await (0, usercntroller_1.getUsers)(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: "Server Error",
            error: expect.any(Error),
        });
    });
    it("should return user by id", async () => {
        const mockUser = {
            name: "Sanju",
            email: "sanju@example.com",
            password: "securepass",
            position: "Developer",
            department: "Engineering",
            address: "Kathmandu, Nepal",
            salary: 50000.0,
            image: "profile1.jpg",
        };
        db_1.default.query.mockImplementation((sql, values, callback) => {
            callback(null, [mockUser]);
        });
        req = { params: { id: "1" } };
        await (0, usercntroller_1.getUserById)(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: "Item fetched",
            data: mockUser,
        });
    });
    it("should handle error when getting user by ID fails", async () => {
        db_1.default.query.mockImplementation((sql, values, callback) => {
            callback(new Error("Get error"), null);
        });
        req = { params: { id: "1" } };
        await (0, usercntroller_1.getUserById)(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: "Server Error",
            error: expect.any(Error),
        });
    });
    it("should create a new user", async () => {
        const mockUserInput = {
            name: "Sanju",
            email: "sanju@example.com",
            password: "123456",
            position: "Developer",
            department: "Engineering",
            address: "Kathmandu",
            salary: 60000,
            image: "image.png",
        };
        const hashedPassword = "hashed123";
        bcrypt_1.default.hash.mockResolvedValue(hashedPassword);
        db_1.default.query.mockImplementation((sql, values, callback) => {
            callback(null, { insertId: 42 });
        });
        req = { body: mockUserInput };
        await (0, usercntroller_1.createUser)(req, res);
        expect(bcrypt_1.default.hash).toHaveBeenCalledWith("123456", 10);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: "Item created",
            data: { id: 42, ...mockUserInput },
        });
    });
    it("should handle error when hashing password fails during create", async () => {
        bcrypt_1.default.hash.mockRejectedValue(new Error("Hash error"));
        req = {
            body: {
                name: "Test",
                email: "test@example.com",
                password: "pass",
                position: "Dev",
                department: "IT",
                address: "Loc",
                salary: 40000,
                image: "img.jpg",
            },
        };
        await (0, usercntroller_1.createUser)(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: "Error hashing password",
            error: expect.any(Error),
        });
    });
    it("should update user by id", async () => {
        const mockUserInput = {
            name: "ranju",
            email: "ranju@example.com",
            password: "7890",
            position: "designer",
            department: "it",
            address: "nepal",
            salary: 80000,
            image: "img.png",
        };
        const hashedPassword = "hash12345";
        bcrypt_1.default.hash.mockResolvedValue(hashedPassword);
        db_1.default.query.mockImplementation((sql, values, callback) => {
            callback(null, { affectedRows: 1 });
        });
        req = {
            params: { id: "42" },
            body: mockUserInput,
        };
        await (0, usercntroller_1.updateUser)(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: "Item updated",
            data: { id: "42", ...mockUserInput },
        });
    });
    it("should handle error when updating user fails", async () => {
        bcrypt_1.default.hash.mockResolvedValue("hashedPwd");
        db_1.default.query.mockImplementation((sql, values, callback) => {
            callback(new Error("Update error"), null);
        });
        req = {
            params: { id: "42" },
            body: {
                name: "User",
                email: "email",
                password: "pwd",
                position: "pos",
                department: "dep",
                address: "addr",
                salary: 10000,
                image: "img.jpg",
            },
        };
        await (0, usercntroller_1.updateUser)(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: "Error updating item",
            error: expect.any(Error),
        });
    });
    it("should delete user by id", async () => {
        db_1.default.query.mockImplementation((sql, values, callback) => {
            callback(null, { affectedRows: 1 });
        });
        req = { params: { id: "1" } };
        await (0, usercntroller_1.deleteUser)(req, res);
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: "Item deleted",
        });
    });
    it("should handle error when deleting user fails", async () => {
        db_1.default.query.mockImplementation((sql, values, callback) => {
            callback(new Error("Delete error"), null);
        });
        req = { params: { id: "99" } };
        await (0, usercntroller_1.deleteUser)(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: "Error deleting item",
            error: expect.any(Error),
        });
    });
});
