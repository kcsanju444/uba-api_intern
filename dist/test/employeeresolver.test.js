"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const employeeresolver_1 = __importDefault(require("../graphql/resolver/employeeresolver"));
const employeeQueries_1 = require("../graphql/query/employeeQueries");
const db_1 = __importDefault(require("../graphql/db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
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
}));
describe("Employee Resolver Tests", () => {
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
    it("should return all employees from employeeList resolver", async () => {
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
        const result = await employeeresolver_1.default.Query.employeeList();
        expect(db_1.default.query).toHaveBeenCalledWith(employeeQueries_1.getAllEmployees, expect.any(Function));
        expect(result).toEqual(mockUsers);
    });
    it("should throw error if database query fails", async () => {
        db_1.default.query.mockImplementation((sql, callback) => {
            callback(new Error("Connection failed"), null);
        });
        await expect(employeeresolver_1.default.Query.employeeList()).rejects.toThrow("Database error: Connection failed");
    });
    it("should show employee by id", async () => {
        const mockUser = {
            id: 1,
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
        const args = { id: 1 };
        const result = await employeeresolver_1.default.Query.employee(null, args);
        expect(db_1.default.query).toHaveBeenCalledWith(employeeQueries_1.getEmployeeById, [1], expect.any(Function));
        expect(result).toEqual(mockUser);
    });
    it("should create a user", async () => {
        const mockUserInput = {
            name: "Sanju",
            email: "sanju@example.com",
            password: "123456",
            position: "Developer",
            department: "Engineering",
            address: "Kathmandu, Nepal",
            salary: 50000.0,
            image: "profile1.jpg",
        };
        const hashedPassword = "hashed123";
        bcrypt_1.default.hash.mockResolvedValue(hashedPassword);
        db_1.default.query.mockImplementation((sql, values, callback) => {
            callback(null, { insertId: 42 });
        });
        const result = await employeeresolver_1.default.Mutation.addEmployee(null, { input: mockUserInput });
        expect(bcrypt_1.default.hash).toHaveBeenCalledWith("123456", 10);
        expect(db_1.default.query).toHaveBeenCalledWith(employeeQueries_1.insertEmployee, [
            mockUserInput.name,
            mockUserInput.email,
            hashedPassword,
            mockUserInput.position,
            mockUserInput.department,
            mockUserInput.address,
            mockUserInput.salary,
            mockUserInput.image,
        ], expect.any(Function));
        expect(result).toEqual({
            id: 42,
            ...mockUserInput,
            password: hashedPassword,
        });
    });
    it("should update a user by ID", async () => {
        const userId = "42";
        const mockUserUpdateInput = {
            name: "Sanju Updated",
            email: "sanju.updated@example.com",
            password: "newpassword",
            position: "Senior Developer",
            department: "Engineering",
            address: "Lalitpur, Nepal",
            salary: 70000.0,
            image: "profile_updated.jpg",
        };
        const hashedPassword = "newhashed123";
        bcrypt_1.default.hash.mockResolvedValue(hashedPassword);
        db_1.default.query.mockImplementation((sql, values, callback) => {
            callback(null, { affectedRows: 1 });
        });
        const result = await employeeresolver_1.default.Mutation.updateEmployee(null, {
            id: userId,
            updates: mockUserUpdateInput,
        });
        expect(bcrypt_1.default.hash).toHaveBeenCalledWith("newpassword", 10);
        expect(db_1.default.query).toHaveBeenCalledWith(employeeQueries_1.updateEmployeeById, [
            mockUserUpdateInput.name,
            mockUserUpdateInput.email,
            hashedPassword,
            mockUserUpdateInput.position,
            mockUserUpdateInput.department,
            mockUserUpdateInput.address,
            mockUserUpdateInput.salary,
            mockUserUpdateInput.image,
            userId,
        ], expect.any(Function));
        expect(result).toEqual({
            id: userId,
            ...mockUserUpdateInput,
            password: hashedPassword,
        });
    });
    it("should delete a user by ID", async () => {
        const userId = "42";
        db_1.default.query.mockImplementation((sql, values, callback) => {
            callback(null, { affectedRows: 1 });
        });
        const result = await employeeresolver_1.default.Mutation.deleteEmployee(null, { id: userId });
        expect(db_1.default.query).toHaveBeenCalledWith(employeeQueries_1.deleteEmployeeById, [userId], expect.any(Function));
        expect(result).toBe(true);
    });
});
