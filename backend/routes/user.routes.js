import { registerUser, loginUser } from "../controller/users.controller.js";
import { Router } from "express";


const router = Router();

router.post("/register", registerUser);
router.get("/login", loginUser);

export default router;
