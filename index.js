const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log("server is running .....");
});

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("hello");
});
