const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const temporarydata = [
  {
    name: "nik",
    email: "nik/2gmail.com",
    password: "1234",
  },
  {
    name: "nikil",
    email: "nikil/2gmail.com",
    password: "1234",
  },
  {
    name: "nikjsaj",
    email: "niksjjs/2gmail.com",
    password: "1234",
  },
];

exports.signup = (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, " ", email, " ", password);
  //------------- NOTE : checking for User -----------//
  const check = temporarydata.findIndex((el) => el.email === email);
  if (check !== -1) {
    res.status(400).json({
      error: "user exist",
    });
  }
  // -----------token -----------//
  var token = jwt.sign({ email: email }, process.env.SECRET_KEY);
  console.log(token);

  //  ---------------Note : Hashing ---------------//
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      res.status(400).json({ error: "thier is error in this password" });
    }

    const user = {
      name,
      email,
      password: hash,
    };

    temporarydata.push(user);
    console.log(temporarydata);

    res.status(200).json({
      message: "User is succesfully added",
      token: token,
    });
  });
};

// --------sign-in----------//
exports.signIn = (req, res) => {
  const { email, password } = req.body;
  //------------email check -----------//
  const isValid = temporarydata.findIndex((el) => el.email === email);

  if (isValid === -1) {
    res.status(500).json({
      error: "user does-not exist",
    });
  }
  //----------password hash ----------//
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      res.status(500).json("thier is some error");
    }
    const validity = temporarydata.findIndex((el) => el.password === password);
    console.log(hash);
    if (validity === -1) {
      res.status(500).json({
        error: "password is wrong",
      });
    } else {
      res.status(200).json({
        messaage: "welcome user",
      });
    }
  });
};
