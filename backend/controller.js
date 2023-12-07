const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const dashboardtodo = require("../backend/routes/dashboardtodo");
const myqueue = require("../backend/routes/myqueue");
const isDraft = require("../backend/routes/isdraft");
app.put("/updateTodraft", isDraft);
app.get("/translator_dashboard", dashboardtodo);
app.put("/update", myqueue);
module.exports = app;
