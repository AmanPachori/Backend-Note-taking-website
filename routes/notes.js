const express = require("express");
const {
  addNote,
  getNotes,
  updateNotes,
  deleteNotes,
} = require("../controllers/notes");
const { handleNoteidParam } = require("../Middleware/notesmiddleware");

const { verifytoken } = require("../Middleware/authmiddleware");
const router = express.Router();

router.param("noteID", handleNoteidParam);
router.post("/add", verifytoken, addNote);
router.get("/getAllNotes", verifytoken, getNotes);
router.put("/updates/:noteID", verifytoken, updateNotes);
router.delete("/delete/:noteID", verifytoken, deleteNotes);

module.exports = router;
