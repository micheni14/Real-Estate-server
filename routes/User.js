import express from 'express';
import { updateUser, deleteUser } from '../controllers/User.js';
import { VerifyToken } from '../middleware/auth.js';

const router = express.Router(); // Added semicolon here

router.put('/update/:id', VerifyToken, updateUser);
router.delete('/delete/:id', VerifyToken, deleteUser);
export default router;
