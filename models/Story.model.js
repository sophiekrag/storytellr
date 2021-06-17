const { Schema, model } = require("mongoose");

const storySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
    },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "public",
      enum: ["public", "private"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Story", storySchema);
