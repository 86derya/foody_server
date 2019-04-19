const mongoose = require("mongoose");
const { Schema } = mongoose;
const timestamp = require("../middleware/timestamp");
var uniqueValidator = require("mongoose-unique-validator");

const orderSchema = new Schema({
  creator: String,
  productsList: [
    { productId: String, type: { type: String }, itemsCount: Number }
  ],
  deliveryType: String,
  deliveryAdress: String,
  sumToPay: Number,
  status: String
});

orderSchema.plugin(timestamp);
orderSchema.plugin(uniqueValidator);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
