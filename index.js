const express = require("express");
const app = express();

const cors = require("cors");

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors);
app.listen(PORT, () => {
  console.log("server is running .....");
});

app.get("/", (req, res) => {
  res.send("hello");
});
