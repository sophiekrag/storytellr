const express = require("express");
const Story = require("../models/Story.model");
const router = express.Router();

/* GET home page */
router.get("/stories", async (req, res, next) => {
  const { story } = req.params;
  try {
    const stories = await Story.find(story).populate("author");
    res.render("stories", { stories: stories });
  } catch (err) {
    console.log("Error while retrieving story details: ", err), next(err);
  }
});

module.exports = router;
