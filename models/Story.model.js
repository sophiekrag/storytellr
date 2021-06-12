const { Schema, model } = require("mongoose");

const storySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
    },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    description: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Story", storySchema);
