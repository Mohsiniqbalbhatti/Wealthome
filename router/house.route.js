import express from "express";
import { getHouse, addHouse } from "../controller/house.controller.js";

const router = express.Router();
router.get("/getHouse", getHouse);
router.post("/addHouse", addHouse);

export default router;
