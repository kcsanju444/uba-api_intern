"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = `#graphql
type Employee {
  id: ID!
  name: String!
  email: String!
  password: String!
  position: String!
  department: String!
  address: String!
  salary: Float
  image: String!
}

input AddEmployeeInput {
  name: String!
  email: String!
  password: String!
  position: String!
  department: String!
  address: String!
  salary: Float
  image: String!
}
input UpdateEmployeeInput {
  id: ID!
  name: String!
  email: String!
  password: String!
  position: String!
  department: String!
  address: String!
  salary: Float
  image: String!
}


type Query {
  employeeList: [Employee!]!
  employee(id: ID!): Employee
}

type Mutation {
  addEmployee(input: AddEmployeeInput!): Employee
  updateEmployee(id: ID!, updates: UpdateEmployeeInput!): Employee
  deleteEmployee(id: ID!): Boolean
}
`;
