const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const todoSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    done: { type: Boolean, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
