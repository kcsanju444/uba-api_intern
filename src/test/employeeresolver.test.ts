import resolver from "../graphql/resolver/employeeresolver";
import { getAllEmployees, getEmployeeById } from "../graphql/query/employeeQueries";
import db from "../graphql/db";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { Mock } from "node:test";

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

describe("Employee Resolver Tests", () => {
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
    (db.query as jest.Mock).mockImplementation((sql, callback) => {
      callback(null, mockUsers);
    });

    const result = await resolver.Query.employeeList();

    expect(db.query).toHaveBeenCalledWith(getAllEmployees, expect.any(Function));
    expect(result).toEqual(mockUsers);
  });

  it("should throw error if database query fails", async () => {
    (db.query as jest.Mock).mockImplementation((sql, callback) => {
      callback(new Error("Connection failed"), null);
    });
    await expect(resolver.Query.employeeList()).rejects.toThrow("Database error: Connection failed");
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

  (db.query as jest.Mock).mockImplementation((sql, values, callback) => {
    callback(null, [mockUser]);
  });

  const args = { id: 1 }; 
  const result = await resolver.Query.employee(null, args);

  expect(db.query).toHaveBeenCalledWith(getEmployeeById, [1], expect.any(Function));
  expect(result).toEqual(mockUser); 
  
});
});
