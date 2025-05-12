import resolver from "../graphql/resolver/employeeresolver"; 
import { deleteEmployeeById, getAllEmployees, getEmployeeById, insertEmployee, updateEmployeeById } from "../graphql/query/employeeQueries"; 
import db from "../graphql/db"; 
import bcrypt from "bcrypt"; 
import { Request, Response } from "express"; 

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
    (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

    (db.query as jest.Mock).mockImplementation((sql, values, callback) => {
      callback(null, { insertId: 42 })
    });

    const result = await resolver.Mutation.addEmployee(null, { input: mockUserInput });

    expect(bcrypt.hash).toHaveBeenCalledWith("123456", 10);
    expect(db.query).toHaveBeenCalledWith(
      insertEmployee,
      [
        mockUserInput.name,
        mockUserInput.email,
        hashedPassword,
        mockUserInput.position,
        mockUserInput.department,
        mockUserInput.address,
        mockUserInput.salary,
        mockUserInput.image,
      ],
      expect.any(Function)
    );

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
    (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

    (db.query as jest.Mock).mockImplementation((sql, values, callback) => {
      callback(null, { affectedRows: 1 }); 
    });

    const result = await resolver.Mutation.updateEmployee(null, {
      id: userId,
      updates: mockUserUpdateInput,
    });

    expect(bcrypt.hash).toHaveBeenCalledWith("newpassword", 10);
    expect(db.query).toHaveBeenCalledWith(
      updateEmployeeById,
      [
        mockUserUpdateInput.name,
        mockUserUpdateInput.email,
        hashedPassword,
        mockUserUpdateInput.position,
        mockUserUpdateInput.department,
        mockUserUpdateInput.address,
        mockUserUpdateInput.salary,
        mockUserUpdateInput.image,
        userId,
      ],
      expect.any(Function)
    );

    expect(result).toEqual({
      id: userId,
      ...mockUserUpdateInput,
      password: hashedPassword,
    });
  });

  it("should delete a user by ID", async () => {
    const userId = "42";

    (db.query as jest.Mock).mockImplementation((sql, values, callback) => {
      callback(null, { affectedRows: 1 }); 
    });

    const result = await resolver.Mutation.deleteEmployee(null, { id: userId });

    expect(db.query).toHaveBeenCalledWith(
      deleteEmployeeById,
      [userId],
      expect.any(Function)
    );
    expect(result).toBe(true);
  });
});
