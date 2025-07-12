import { Router } from "express";
import {adminLogin, banUser} from "../controller/admin.controller.js";
import auth from "../middleware/auth.js";
const router = Router();

router.get("/login",adminLogin);
router.patch("/:id/ban", auth,banUser);

export default router;