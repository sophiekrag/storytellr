const router = require("express").Router();

const Book = require("../models/Book.model");

router.get("/books/create", (req, res) => {
  res.render("book-create");
});

router.post("/books/create", (req, res) => {
  console.log(req.body);
  const { title, author, description, rating } = req.body;

  Book.create({ title, author, description, rating })
    .then((bookFromDB) => console.log(`New book created: ${bookFromDB.title}.`))
    .then(res.render("users/user-profile"))
    .catch((error) => console.log(`Error while creating a new book:`, error));
});

module.exports = router;
