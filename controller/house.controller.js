import House from "../model/house.model.js";
import User from "../model/user.model.js";
import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export const getHouse = async (req, res) => {
  try {
    const house = await House.find();
    res.status(200).json(house);
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addHouse = async (req, res) => {
  try {
    const {
      price,
      location,
      bedrooms,
      bathrooms,
      type,
      transaction,
      sqft,
      agency,
      zipcode,
      userId,
    } = req.body;
    const userExist = await User.findById(userId);
    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: "Please provide an image" });
    }
    const image = req.files.image;

    const result = await cloudinary.v2.uploader.upload(image.tempFilePath, {
      folder: "wealthhome",
    });
    const picUrl = result.secure_url;

    const newHouse = new House({
      picUrl,
      price,
      location,
      bedrooms,
      bathrooms,
      type,
      transaction,
      sqft,
      agency,
      zipcode,
      userId,
    });
    await newHouse.save();

    res.status(201).json({ message: "House added successfully", picUrl });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
