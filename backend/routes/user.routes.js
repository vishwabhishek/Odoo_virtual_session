import { registerUser, loginUser ,addSkill, sendReq} from "../controller/users.controller.js";
import { Router } from "express";
import auth from "../middleware/auth.js";

const router = Router();

router.post("/register", registerUser);
router.get("/login", loginUser);
router.post("/addskill",auth,addSkill)
router.post("/sendReq", sendReq)

export default router;
