const express = require("express");
const router = express.Router();
const pool = require("../config/database");

router.put("/updateTodraft", async (req, res) => {
  const { file_id } = req.body;
  console.log(req.body);
  const result = await pool.query(
    "UPDATE translator_inbox SET  isdraft=true  WHERE file_id =$1",
    [file_id]
  );
  console.log(result);
  res.json(result.rows);
});

module.exports = router;
