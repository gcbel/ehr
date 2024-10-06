// DEPENDENCIES
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const db = require("./config/connection");
const app = express();

// MIDDLEWARE

app.use(express.json());


// API
const apiRoutes = require("./routes/index.js");
app.use("/api", apiRoutes);

const PORT = process.env.PORT || 3001;

// SERVER
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`REST APIs listening at http://localhost:${PORT}`);
  });
});
