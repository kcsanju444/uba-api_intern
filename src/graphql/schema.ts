export const typeDefs = `#graphql
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
  name: String!
  email: String!
  password: String
  position: String!
  department: String!
  address: String!
  salary: Float
  image: String!
}

type AuthPayload {
  token: String!
}

type Query {
  employeeList: [Employee!]!
  employee(id: ID!): Employee
}

type Mutation {
  addEmployee(input: AddEmployeeInput!): Employee
  updateEmployee(id: ID!, updates: UpdateEmployeeInput!): Employee
  deleteEmployee(id: ID!): Boolean

  # New login mutation
  login(email: String!, password: String!): AuthPayload!
}
`;
