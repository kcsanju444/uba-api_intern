import { Router } from "express";
import { getUsers } from "../controller/usercntroller";
const router = Router();

router.get("/", getUsers);

export default router;
