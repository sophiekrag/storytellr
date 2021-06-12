const router = require("express").Router();

const User = require("../models/User.model");
const Book = require("../models/Book.model");

//Direction to the userProfile
router.get("/userProfile", async (req, res) => {
  try {
    const result = await User.findById(req.session.currentUser._id).populate(
      "books"
    );
    res.render("user/dashboard", {
      userInSession: req.session.currentUser,
      books: result,
    });
  } catch (err) {
    console.log(`Err while getting the posts from the DB: ${err}`);
  }
});

//Get the books/create route on the site
router.get("/books/create", (req, res) => {
  res.render("user/book-create");
});

//Post the newly created book into the db
router.post("/create", async (req, res) => {
  const { title, author, description, rating } = req.body;
  try {
    const newBook = await Book.create({
      title,
      author,
      description,
      rating,
      user: req.session.currentUser._id,
    });
    await User.findByIdAndUpdate(req.session.currentUser._id, {
      $push: { books: newBook._id },
    });
    res.redirect("/userProfile");
  } catch (err) {
    console.error(err);
  }
});

//Get details
router.get("/books/:bookId", async (req, res, next) => {
  const { bookId } = req.params;
  try {
    const bookDetails = await Book.findById(bookId);
    res.render("user/book-detail", { book: bookDetails });
  } catch (err) {
    console.log("Error while retrieving book details: ", err), next(err);
  }
});

//Edit book
router.get("/books/:id/edit", async (req, res, next) => {
  const { id } = req.params;
  try {
    const bookToEdit = await Book.findById(id);
    res.render("user/book-edit", { book: bookToEdit });
  } catch (err) {
    next(err);
  }
});

router.post("/books/:id/edit", async (req, res, next) => {
  const { id } = req.params;
  const { title, description, author, rating } = req.body;
  try {
    const bookToUpdate = await Book.findByIdAndUpdate(
      id,
      { title, description, author, rating },
      { new: true }
    );
    res.redirect(`/books/${bookToUpdate.id}`);
  } catch (err) {
    next(err);
  }
});

//Delete book
router.post("/books/:id/delete", async (req, res, next) => {
  const { id } = req.params;
  try {
    await Book.findByIdAndDelete(id);
    res.redirect("/userProfile");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
