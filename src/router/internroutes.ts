import { Router } from "express";
import { getInternships } from "../controller/internshipcontroller";
const router = Router();

router.get("/", getInternships);

export default router;
