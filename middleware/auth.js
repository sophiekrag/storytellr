function checkAuth(req, res, next) {
  if (req.session.currentUser) {
    next();
  } else {
    res.send("You are not authorized to view this page");
  }
}

module.exports = checkAuth;
