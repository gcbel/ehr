const express = require("express");
const mongoose = require("mongoose");

const db = require("./config/connection");
const app = express();

const apiRoutes = require("./routes/index.js");

const path = require("path");

require("dotenv").config();

app.use(express.json());
app.use("/api", apiRoutes);

const PORT = process.env.PORT || 3001;

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`REST APIs listening at http://localhost:${PORT}`);
  });
});
