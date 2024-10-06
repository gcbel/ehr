const express = require("express");
const mongoose = require("mongoose");
const patientRoutes = require("./routes/patientRoutes");
const db = require("./config/connection");
const app = express();
const path = require("path");

require("dotenv").config();

app.use(express.json());
app.use("/api/patients", patientRoutes);

const PORT = process.env.PORT || 3001;

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`REST APIs listening at http://localhost:${PORT}`);
  });
});
