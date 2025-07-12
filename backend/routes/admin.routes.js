import { Router } from "express";
import {adminLogin} from "../controller/admin.controller.js";
const router = Router();

router.get("/login",adminLogin);

export default router;