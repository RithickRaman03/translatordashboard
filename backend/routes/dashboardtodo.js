const express = require("express");
const router = express.Router();

const pool = require("../config/database");

router.get("/translator_dashboard", async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM translator_inbox LEFT JOIN user_table ON user_table.id = translator_inbox.id   "
  );
  // console.log(result);
  res.json(result.rows);
});

module.exports = router;
