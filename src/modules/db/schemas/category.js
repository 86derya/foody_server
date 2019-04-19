const mongoose = require("mongoose");
const { Schema } = mongoose;
const timestamp = require("../middleware/timestamp");
const uniqueValidator = require("mongoose-unique-validator");
const ObjectId = mongoose.Schema.Types.ObjectId;

const categorySchema = new Schema({
  id: ObjectId,
  name: {
    type: String,
    required: true
  }
});

categorySchema.plugin(timestamp);
categorySchema.plugin(uniqueValidator);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
