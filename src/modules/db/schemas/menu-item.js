const mongoose = require("mongoose");
const { Schema } = mongoose;
const timestamp = require("../middleware/timestamp");
const uniqueValidator = require("mongoose-unique-validator");

const CATEGORY = require("./category");
const INGREDIENT = require("./ingredient");
const USER = require("./user");
const COMMENT = require("./comment");
const ObjectId = mongoose.Schema.Types.ObjectId;
const menuItemSchema = new Schema({
  id: ObjectId,
  name: { type: String, required: true, unique: true },
  description: String,
  image: String,
  price: Number,
  currency: String,
  category: [
    {
      type: ObjectId,
      ref: CATEGORY,
      required: true
    }
  ],
  likes: String,
  ingredients: [
    {
      type: ObjectId,
      ref: INGREDIENT
    }
  ],
  comments: [
    {
      id: ObjectId,
      text: String,
      Author: {
        type: String,
        default: "anonymous"
      },
      mark: {
        type: Number,
        min: 1,
        max: 10,
        default: 0
      },
      createdAt: String
    }
  ]
});

menuItemSchema.plugin(timestamp);
menuItemSchema.plugin(uniqueValidator);

const menuItem = mongoose.model("menu-item", menuItemSchema);

module.exports = menuItem;
