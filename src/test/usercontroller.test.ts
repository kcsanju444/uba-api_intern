import { getUserById, getUsers } from "../controller/usercntroller";
import db from "../graphql/db";
import { Request, Response } from "express";

jest.mock("../graphql/db");

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
  });

  it("should return all users", async () => {
    const mockUsers = [{ id: 1,
      name: 'Sanju',
      email: 'sanju@example.com',
      password: 'securepass',
      position: 'Developer',
      department: 'Engineering',
      address: 'Kathmandu, Nepal',
      salary: 50000.0,
      image: 'profile1.jpg', }];

    (db.query as jest.Mock).mockImplementation((sql, callback) => {
      callback(null, mockUsers);
    });

    await getUsers(req as Request, res as Response);

    expect(db.query).toHaveBeenCalledWith(
      "SELECT * FROM employee",
      expect.any(Function)
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Items fetched",
      data: mockUsers,
    });
  });

  it("should return by id", async () => {
    const mockUsers = [{  id: 1,
      name: 'Sanju',
      email: 'sanju@example.com',
      password: 'securepass',
      position: 'Developer',
      department: 'Engineering',
      address: 'Kathmandu, Nepal',
      salary: 50000.0,
      image: 'profile1.jpg', }];
    (db.query as jest.Mock).mockImplementation((sql, value, callback) => {
      callback(null, [mockUsers]);
    });
    req = { params: { id: "1" } };
    await getUserById(req as Request, res as Response);
    expect(db.query).toHaveBeenCalledWith(
      "SELECT * FROM employee WHERE id = ?",
      ["1"],
      expect.any(Function)
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Item fetched",
      data: mockUsers,
    });
  });
  
});
