import { contact } from "../controller/contact.controller.js";
import express, { Router } from "express";

const router = new Router();
router.post("/", contact);
export default router;
