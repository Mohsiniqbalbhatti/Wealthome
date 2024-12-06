import {
  addToWishList,
  removeFromWishList,
  getUserWishList,
} from "../controller/wishList.controller.js";
import express from "express";

const router = express.Router();

router.post("/addtoWishList", addToWishList);
router.get("/getUserWishList/:userId", getUserWishList);
router.delete("/removeFromWishList", removeFromWishList);

export default router;
