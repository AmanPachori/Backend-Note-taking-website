exports.handleNoteidParam = (req, res, next, id) => {
  req.noteID = id;

  next();
};
