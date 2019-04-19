const mongoose = require("mongoose");
const { Schema } = mongoose;
const timestamp = require("../middleware/timestamp");
const uniqueValidator = require("mongoose-unique-validator");
const ObjectId = mongoose.Schema.Types.ObjectId;

const commentSchema = new Schema({
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
  }
});

commentSchema.plugin(timestamp);
commentSchema.plugin(uniqueValidator);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
