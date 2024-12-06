import User from "../model/user.model.js";
import House from "../model/house.model.js";
import WishList from "../model/wishList.model.js";

export const addToWishList = async (req, res) => {
  try {
    const { userId, houseId } = req.body;
    const userExist = await User.findById(userId);
    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }
    const houseExist = await House.findById(houseId);

    if (!houseExist) {
      return res.status(404).json({ message: "house not found" });
    }

    const wishListExist = await WishList.findOne({ userId, houseId });
    if (wishListExist) {
      return res.status(400).json({ message: "house already in wishlist" });
    }

    const newWishList = new WishList({ userId, houseId });
    await newWishList.save();
    res.status(200).json({ message: "house added to wishlist" });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({
      message: "Server error",
      error: error.message || "Something went wrong",
    });
  }
};

export const getUserWishList = async (req, res) => {
  try {
    const { userId } = req.params;
    const userWishList = await WishList.find({ userId: userId }).populate(
      "houseId"
    );

    if (userWishList.length === 0) {
      return res
        .status(404)
        .json({ message: "whishList not found! Add houses to your WishList " });
    }

    res.status(200).json(userWishList);
  } catch (error) {
    console.log("error: " + error);
    res.status(500).json({ message: "Server error: ", error: error });
  }
};

export const removeFromWishList = async (req, res) => {
  try {
    const { userId, houseId } = req.body;

    const wishListItem = await WishList.findOne({
      userId: userId,
      houseId: houseId,
    });

    if (!wishListItem) {
      return res.status(404).json({ message: "house not found in wishlist" });
    }

    await WishList.findByIdAndDelete(wishListItem._id);
    res.status(200).json({ message: "house removed from wishlist" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "server error", error: error });
  }
};
