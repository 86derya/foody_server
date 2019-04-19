const mongoose = require("mongoose");
const { Schema } = mongoose;
const timestamp = require("../middleware/timestamp");
var ObjectId = mongoose.Schema.Types.ObjectId;
const ingredientSchema = new Schema({
  id: ObjectId,
  name: { type: String, required: true },
  description: String
});

ingredientSchema.plugin(timestamp);

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

module.exports = Ingredient;
