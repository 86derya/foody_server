const mongoose = require("mongoose");
const { Schema } = mongoose;
const timestamp = require("../middleware/timestamp");
const uniqueValidator = require("mongoose-unique-validator");
const ObjectId = mongoose.Schema.Types.ObjectId;
const ingredient = require("./ingredient");

const productSchema = new Schema({
  id: ObjectId,
  sku: { type: Number, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  description: String,
  price: Number,
  currency: String,
  creatorId: String,
  categories: Array,
  likes: String,
  ingredients: [
    {
      type: ObjectId,
      ref: ingredient,
      required: true
    }
  ]
});

productSchema.plugin(timestamp);
productSchema.plugin(uniqueValidator);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
