const { Schema, model } = require("mongoose");

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
      unique: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
    },
    description: String,
    rating: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Books", bookSchema);
