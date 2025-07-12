import { registerUser, loginUser } from "../controller/users.controller.js";
import { Router } from "express";
import auth from "../middleware/auth.js";

const router = Router();

router.post("/register", registerUser);
router.get("/login", loginUser);
router.post("/addskill",auth,)

export default router;
