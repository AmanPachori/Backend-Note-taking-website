require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const noteRoutes = require("./routes/notes");

const client = require("./configure/db");

const app = express();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Change * to the specific origin if needed
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


const PORT = process.env.PORT || 5000;

client.connect((err) => {
  if (err) {
    console.log(err);
  } else console.log("connected to db");
});
app.listen(PORT, () => {
  console.log("server is running ....." + PORT);
});

app.use("/auth", authRoutes, () => {});
app.use("/note", noteRoutes, () => {});

app.get("/", (req, res) => {
  res.send("hello");
});
