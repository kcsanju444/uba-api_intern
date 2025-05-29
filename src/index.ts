import "reflect-metadata";
import express, { Application } from "express";
import http from "http";
import compression from "compression";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { employeeRouter } from "./authentication/routes/employeerouter";
import { adminRouter } from "./authentication/routes/adminrouter";

dotenv.config();

const app: Application = express();

// Allow requests from anywhere (you can tighten this later if needed)
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Parse cookies
app.use(cookieParser());

// Use gzip compression
app.use(compression());

// Root route to verify server is running
app.get('/', (req, res) => {
  res.send('API is running');
});

// Mount your routers
app.use("/api/employee", employeeRouter);
app.use("/api/admin", adminRouter);

const httpServer = http.createServer(app);

const PORT = process.env.PORT || 8080;

httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
