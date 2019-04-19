const mongoose = require("mongoose");
const { Schema } = mongoose;
const ObjectId = mongoose.Schema.Types.ObjectId;
const timestamp = require("../middleware/timestamp");
const uniqueValidator = require("mongoose-unique-validator");
const COMMENT = require("./comment");
const ORDER = require("./order");
const MENU_ITEM = require("./menu-item");

const userSchema = new Schema({
  id: ObjectId,
  firstName: { type: String, default: "N/A" },
  lastName: { type: String, default: "N/A" },
  phone: { type: String, default: "N/A" },
  nickName: { type: String, required: true, unique: true },
  location: { type: String, default: "N/A" },
  password: String,
  email: { type: String, required: true, unique: true },
  orders: [
    {
      productsList: [
        { productId: String, type: { type: String }, itemsCount: Number }
      ],
      deliveryType: String,
      deliveryAdress: String,
      sumToPay: Number,
      status: String
    }
  ]
  // comments: [
  //   {
  //     type: ObjectId,
  //     ref: COMMENT
  //   }
  // ]
});

userSchema.plugin(timestamp);
userSchema.plugin(uniqueValidator);

const user = mongoose.model("user", userSchema);

module.exports = user;
