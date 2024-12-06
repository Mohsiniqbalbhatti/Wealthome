import userModel from "../model/user.model.js";
import bcryptjs from "bcryptjs";
export const signup = async (req, res) => {
  try {
    const { firstname, lastname, email, password, confirmPassword } = req.body;

    const user = await userModel.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password Must be greater the 8 characters" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const hashPassword = await bcryptjs.hash(password, 10);
    const newUser = new userModel({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashPassword,
    });
    await newUser.save();
    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    const match = await bcryptjs.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Wrong Password" });
    }

    res.json({
      message: "Logged in successfully",
      user: {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({ message: "Server error", error: error });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { _id } = req.body;
    const { firstname, lastname, email, password } = req.body;

    const user = await userModel.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found", user: user });
    }

    const match = await bcryptjs.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Wrong Password" });
    }
    const update = {
      firstname,
      lastname,
      email,
    };
    const updatedUser = await userModel.findByIdAndUpdate(_id, update, {
      new: true,
    });

    res.status(200).json({ message: "Profile updated", user: updatedUser });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
