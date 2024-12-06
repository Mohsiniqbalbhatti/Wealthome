import { login, signup, updateUser } from "../controller/user.controller.js";
import express from "express";

const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.post("/updateUser", updateUser);
export default router;
