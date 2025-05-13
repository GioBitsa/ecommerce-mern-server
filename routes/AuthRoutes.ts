import { Router } from "express";
import { UserRegister, UserLogin } from "../controllers/AuthController";

const router = Router();

// POST /api/auth/register
router.post("/register", UserRegister);

// POST /api/auth/login
router.post("/login", UserLogin);

export default router;
