const router = require("express").Router();

const User = require("../models/User.model");
const Book = require("../models/Book.model");
const isAuth = require("../middleware/auth");

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

router.get("/userProfile", isAuth, async (req, res) => {
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

//Get details
router.get("/userProfile/:bookId", (req, res, next) => {
  const { bookId } = req.params;

  Book.findById(bookId)
    .then((theBook) => res.render("user/book-detail", { book: theBook }))
    .catch((error) => {
      console.log("Error while retrieving book details: ", error);

      next(error);
    });
});

router.get("/userProfile/:id/edit", (req, res, next) => {
  const { id } = req.params;

  Book.findById(id)
    .then((bookToEdit) => {
      console.log(bookToEdit);
      res.render("user/book-edit", { book: bookToEdit });
    })
    .catch((error) => next(error));
});

router.post("/userProfile/:id/edit", (req, res, next) => {
  const { id } = req.params;
  const { title, description, author, rating } = req.body;

  Book.findByIdAndUpdate(
    id,
    { title, description, author, rating },
    { new: true }
  )
    .then((updatedBook) => res.redirect(`/userProfile/${updatedBook.id}`))
    .catch((error) => next(error));
});
module.exports = router;
