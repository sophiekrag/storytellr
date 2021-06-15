function checkAuth(req, res, next) {
  if (req.session.currentUser) {
    next();
  } else {
    res.render("../views/noAuth.hbs");
  }
}

module.exports = checkAuth;
