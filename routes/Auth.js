import express from 'express'
import { Register, Login } from '../controllers/Auth.js'
import { Logout } from '../controllers/Auth.js'
import { VerifyToken } from '../middleware/auth.js'


const router = express.Router();

router.post("/register", Register) 
router.post("/login", Login) 
router.delete("/logout", VerifyToken, Logout) 

export default router;