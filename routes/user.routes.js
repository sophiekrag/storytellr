const router = require("express").Router();

const User = require("../models/User.model");
const Story = require("../models/Story.model");

//Direction to the userProfile
router.get("/userProfile", async (req, res) => {
  try {
    const result = await User.findById(req.session.currentUser._id).populate(
      "stories"
    );
    res.render("user/dashboard", {
      userInSession: req.session.currentUser,
      stories: result,
    });
  } catch (err) {
    console.log(`Err while getting the posts from the DB: ${err}`);
  }
});

//Get the books/create route on the site
router.get("/stories/create", (req, res) => {
  res.render("user/story-create");
});

//Post the newly created book into the db
router.post("/create", async (req, res) => {
  const { title, description } = req.body;
  try {
    const newStory = await Story.create({
      title,
      author: req.session.currentUser._id,
      description,
    });
    await User.findByIdAndUpdate(req.session.currentUser._id, {
      $push: { stories: newStory._id },
    });
    res.redirect("/userProfile");
  } catch (err) {
    console.error(err);
  }
});

//Get details
router.get("/stories/:storyId", async (req, res, next) => {
  const { storyId } = req.params;
  try {
    const storyDetails = await Story.findById(storyId);
    res.render("user/story-detail", { story: storyDetails });
  } catch (err) {
    console.log("Error while retrieving story details: ", err), next(err);
  }
});

//Edit book
router.get("/stories/:id/edit", async (req, res, next) => {
  const { id } = req.params;
  try {
    const storyToEdit = await Story.findById(id);
    res.render("user/story-edit", { story: storyToEdit });
  } catch (err) {
    next(err);
  }
});

router.post("/stories/:id/edit", async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const storyToUpdate = await Story.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    res.redirect(`/stories/${storyToUpdate.id}`);
  } catch (err) {
    next(err);
  }
});

//Delete book
router.post("/stories/:id/delete", async (req, res, next) => {
  const { id } = req.params;
  try {
    await Story.findByIdAndDelete(id);
    res.redirect("/userProfile");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
