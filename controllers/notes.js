const client = require("../configure/db");

exports.addNote = (req, res) => {
  const { heading, content } = req.body;

  client
    .query(
      `INSERT INTO notes (email,heading,content) VALUES ('${req.email}','${heading}','${content}');`
    )
    .then((data) => {
      res.status(200).json({
        message: "all ok",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "database error occurred",
      });
    });
};
exports.getNotes = (req, res) => {
  client
    .query(`SELECT * FROM notes where email='${req.email}';`)
    .then((data) => {
      const noteData = data.rows;
      const filteredData = noteData.map((note) => {
        return {
          noteId: note.noteid,
          heading: note.heading,
          content: note.content,
        };
      });
      res.status(200).json({
        message: "all ok",
        data: filteredData,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "database error occurred",
      });
    });
};
exports.updateNotes = (req, res) => {
  const noteID = req.noteID;
  const { heading, content } = req.body;
  client
    .query(
      `UPDATE notes SET heading='${heading}', content='${content}' WHERE noteid='${noteID}';`
    )
    .then((data) => {
      res.status(200).json({
        message: "all ok",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "database error occurred",
      });
    });
};
exports.deleteNotes = (req, res) => {
  const noteID = req.noteID;
  client
    .query(`DELETE FROM notes WHERE noteid='${noteID}';`)
    .then((data) => {
      res.status(200).json({
        message: "data deleted succesfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "database error occurred",
      });
    });
};
