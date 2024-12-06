import contactModel from "../model/contact.model.js";

export const contact = async (req, res) => {
  try {
    const { firstname, lastname, email, message } = req.body;
    const newContact = new contactModel({
      firstname,
      lastname,
      email,
      message,
    });
    await newContact.save();
    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.log("Error", error);
    res
      .status(500)
      .json({
        message: "Internal Sever Error",
        error: error.message || "Something went wrong",
      });
  }
};
