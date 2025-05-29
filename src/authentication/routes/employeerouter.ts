import express from 'express';
import {
  employeeLogin,
  employeeRegister,
  getEmployeeDetail,
} from '../controller/employeecontroller';
import { authenticateUser } from '../middleware/authmiddleware';

const router = express.Router();

router.post('/login', employeeLogin);
router.post('/register', employeeRegister); // 👈 you're trying to hit this
router.get('/detail/:id', authenticateUser, getEmployeeDetail);

export const employeeRouter = router;
