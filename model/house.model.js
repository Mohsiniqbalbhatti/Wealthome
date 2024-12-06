import mongoose from "mongoose";

const houseScheme = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  price: Number,
  agency: String,
  location: String,
  sqft: Number,
  bathrooms: Number,
  bedrooms: Number,
  type: String,
  transaction: String,
  zipcode: Number,
  picUrl: String,
});

const House = mongoose.model("House", houseScheme);

export default House;
