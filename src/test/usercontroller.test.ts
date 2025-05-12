import { createUser, deleteUser, getUserById, getUsers, updateUser } from "../controller/usercntroller";
import db from "../graphql/db";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { getAllEmployees } from "../graphql/query/employeeQueries";
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
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    (db.query as jest.Mock).mockClear();
    (bcrypt.hash as jest.Mock).mockClear();
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

    (db.query as jest.Mock).mockImplementation((sql, callback) => {
      callback(null, mockUsers);
    });

    await getUsers(req as Request, res as Response);

    // expect(db.query).toHaveBeenCalledWith(getAllEmployees, expect.any(Function));
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Items fetched",
      data: mockUsers,
    });
  });

  it("should return 'No items found' when result is empty", async () => {
    (db.query as jest.Mock).mockImplementation((sql, callback) => {
      callback(null, []);
    });

    await getUsers(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "No items found",
      data: [],
    });
  });

  it("should handle database errors", async () => {
    const error = new Error("Database error");

    (db.query as jest.Mock).mockImplementation((sql, callback) => {
      callback(error, null);
    });

    await getUsers(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Server Error",
      error,
    });
  });


  it("should handle error when getting users fails", async () => {
    (db.query as jest.Mock).mockImplementation((sql, callback) => {
      callback(new Error("DB error"), null);
    });

    await getUsers(req as Request, res as Response);

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

    (db.query as jest.Mock).mockImplementation((sql, values, callback) => {
      callback(null, [mockUser]);
    });

    req = { params: { id: "1" } };

    await getUserById(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Item fetched",
      data: mockUser,
    });
  });

  it("should handle error when getting user by ID fails", async () => {
    (db.query as jest.Mock).mockImplementation((sql, values, callback) => {
      callback(new Error("Get error"), null);
    });

    req = { params: { id: "1" } };

    await getUserById(req as Request, res as Response);

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
    (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

    (db.query as jest.Mock).mockImplementation((sql, values, callback) => {
      callback(null, { insertId: 42 });
    });

    req = { body: mockUserInput };

    await createUser(req as Request, res as Response);

    expect(bcrypt.hash).toHaveBeenCalledWith("123456", 10);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Item created",
      data: { id: 42, ...mockUserInput },
    });
  });

  it("should handle error when hashing password fails during create", async () => {
    (bcrypt.hash as jest.Mock).mockRejectedValue(new Error("Hash error"));

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

    await createUser(req as Request, res as Response);

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
    (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

    (db.query as jest.Mock).mockImplementation((sql, values, callback) => {
      callback(null, { affectedRows: 1 });
    });

    req = {
      params: { id: "42" },
      body: mockUserInput,
    };

    await updateUser(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Item updated",
      data: { id: "42", ...mockUserInput },
    });
  });
  it("should handle error when updating user fails", async () => {
    (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPwd");

    (db.query as jest.Mock).mockImplementation((sql, values, callback) => {
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

    await updateUser(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error updating item",
      error: expect.any(Error),
    });
  });

  it("should delete user by id", async () => {
    (db.query as jest.Mock).mockImplementation((sql, values, callback) => {
      callback(null, { affectedRows: 1 });
    });

    req = { params: { id: "1" } };

    await deleteUser(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Item deleted",
    });
  });

  it("should handle error when deleting user fails", async () => {
    (db.query as jest.Mock).mockImplementation((sql, values, callback) => {
      callback(new Error("Delete error"), null);
    });

    req = { params: { id: "99" } };

    await deleteUser(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error deleting item",
      error: expect.any(Error),
    });
  });
});
