import express from 'express';
import {  adminLogin } from '../controller/admincontroller';
import { authenticateUser } from '../middleware/authmiddleware';
import { checkPermission } from '../middleware/permissionmiddleware';

const router = express.Router();

router.post('/login', adminLogin);  // Add this for login
router.get('/category', authenticateUser, checkPermission('view_category'),);

export const adminRouter = router;
