const router = require("express").Router();

//const User = require("../models/User.model")
const Book = require("../models/Book.model");

router.get("/books/create", (req, res) => {
  res.render("user/book-create");
});

router.post("/create", (req, res) => {
  console.log(req.body);
  const { title, author, description, rating } = req.body;

  Book.create({ title, author, description, rating })
    .then((bookFromDB) => console.log(`New book created: ${bookFromDB.title}.`))
    .then(res.redirect("/userProfile"))
    .catch((error) => console.log(`Error while creating a new book:`, error));
});

module.exports = router;
