var jwt = require("jsonwebtoken");
const client = require("../configure/db");

exports.verifytoken = (req, res, next) => {
  // console.log(req.headers);

  const token = req.headers.authorization;
  jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
    if (err) {
      console.log(err);
    }

    const userEmail = decoded.email;
    client
      .query(`SELECT * FROM users WHERE email ='${userEmail}';`)
      .then((data) => {
        if (data.rows.length === 0) {
          res.status(400).json({
            message: "Data fetch succesfully",
          });
        } else {
          req.email = userEmail;
          next();
        }
      })
      .catch((err) => {
        res.status(500).json({
          error: "database error occured",
        });
      });
  });
};
