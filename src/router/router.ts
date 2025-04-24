import express from "express";
import RegisterController from "../controller/authentication";

const router = express.Router();
const registerController = new RegisterController();

// Define the routes
router.post("/register", registerController.create);
router.get("/users", registerController.findAll);  // You can adjust this route based on your needs
router.get("/users/:id", registerController.findOne);
router.put("/users/:id", registerController.update);
router.delete("/users/:id", registerController.delete);

export default router;
