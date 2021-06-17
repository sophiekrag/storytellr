const express = require("express");
const Story = require("../models/Story.model");
const router = express.Router();

/* GET story page*/
router.get("/stories", async (req, res, next) => {
  try {
    const stories = await Story.find({ status: "public" }).populate("author");
    res.render("stories", { stories });
  } catch (err) {
    console.log("Error while retrieving story details: ", err), next(err);
  }
});

module.exports = router;
