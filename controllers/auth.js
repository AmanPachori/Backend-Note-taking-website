const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const client = require("../configure/db");

// const temporarydata = [
//   {
//     name: "nik",
//     email: "nik/2gmail.com",
//     password: "1234",
//   },
//   {
//     name: "nikil",
//     email: "nikil/2gmail.com",
//     password: "1234",
//   },
//   {
//     name: "nikjsaj",
//     email: "niksjjs/2gmail.com",
//     password: "1234",
//   },
// ];

exports.signup = (req, res) => {
  const { name, email, password } = req.body;

  //------------- NOTE : checking for User -----------//
  // const check = temporarydata.findIndex((el) => el.email === email);
  client
    .query(`SELECT * FROM users where email ='${email}';`)
    .then((data) => {
      const check = data.rows;
      if (check.length !== 0) {
        res.status(400).json({
          error: "user exist",
        });
      } else {
        // -----------token -----------//
        const token = jwt.sign({ email: email }, process.env.SECRET_KEY);

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
          client
            .query(
              `INSERT INTO users (name,email,password) VALUES ('${user.name}','${user.email}','${user.password}');`
            )
            .then((data) => {
              res.status(200).json({
                message: "User is succesfully added",
                token: token,
              });
            })
            .catch((err) => {
              res.status(500).json({
                error: "database error occurred!",
              });
            });
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "database error occurred!",
      });
    });
};

//--------sign-in----------//
exports.signIn = (req, res) => {
  const { email, password } = req.body;

  //------------- NOTE : checking for User -----------//
  // const check = temporarydata.findIndex((el) => el.email === email);
  client
    .query(`SELECT * FROM users where email ='${email}';`)
    .then((data) => {
      const userData = data.rows;
      if (userData.length === 0) {
        res.status(400).json({
          error: "No User exist please sign up ",
        });
      } else {
        //IF THE CONDITION IS FALSE THAT IS USER EMAIL EXISTS IN THE DB WE NEED TO VERIFY THE PASSWORD OF THE USER
        bcrypt.compare(password, userData[0].password, (err, result) => {
          if (err) {
            //WHILE COMPARING IF AN ERROR OCCURS WE SEND BACK SERVER ERROR AS RESPONSE
            res.status(500).json({
              error: "Server error!",
            });
          } else if (result === true) {
            //IF BOTH THE PASSWORDS MATCH (DB PASSWORD AND PASSWORD ENTERED BY THE USER) WE SIGN TOKEN FOR THE USER AND SEND SUCCESS REPONSE
            const token = jwt.sign(
              {
                email: email,
              },
              process.env.SECRET_KEY
            );
            res.status(200).json({
              message: "User signed in successfully",
              token: token,
            });
          } else {
            //IF THE PASSWORDS DON'T MATCH WE SEND BACK RESPONSE TO ENTER CORRECT PASSWORD
            res.status(400).json({
              error: "Enter correct password!",
            });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "database error occurred!",
      });
    });
};
