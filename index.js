require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const noteRoutes = require("./routes/notes");

const client = require("./configure/db");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5500;

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
