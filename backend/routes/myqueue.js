const express = require("express");
const router = express.Router();
const pool = require("../config/database");

router.put("/update", async (req, res) => {
  const { id, file_id } = req.body;
  const result = await pool.query(
    "UPDATE translator_inbox SET  id = $1  WHERE file_id =$2",
    [id, file_id]
  );
  console.log(result);
  res.json(result.rows);
});

module.exports = router;
