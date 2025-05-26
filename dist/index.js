"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_graphql_1 = require("express-graphql");
const schema_1 = require("@graphql-tools/schema");
const schema_2 = require("./graphql/schema"); // Import GraphQL schema
const employeeresolver_1 = __importDefault(require("../src/graphql/resolver/employeeresolver")); // Import resolvers
const router_1 = __importDefault(require("./router/router"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
server.listen(8080, () => {
    console.log('Server running on http://localhost:8080/');
});
const MONGO_URL = process.env.MONGO_URL;
if (!MONGO_URL) {
    throw new Error('MONGO_URL is not defined in .env');
}
mongoose_1.default.Promise = Promise;
mongoose_1.default.connect(MONGO_URL);
mongoose_1.default.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});
mongoose_1.default.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});
// Set up GraphQL endpoint
const schema = (0, schema_1.makeExecutableSchema)({
    typeDefs: schema_2.typeDefs,
    resolvers: employeeresolver_1.default, // Connect resolvers to the schema
});
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)({
    schema: schema,
    graphiql: true,
}));
app.use('/api/auth', router_1.default);
