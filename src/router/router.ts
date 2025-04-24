import express from 'express';
import{
    getUsers,
    getUserById,
    createUser,
    updateUser,deleteUser,
}from '../controller/usercntroller';

const router = express.Router();
router.get('/',getUsers);
router.get('/',getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
export default router;

