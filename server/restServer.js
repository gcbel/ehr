const express = require("express");
const mongoose = require("mongoose");
const patientRoutes = require("./routes/patientRoutes");
const db = require("./config/connection");
const app = express();
app.use(express.json());

app.use("/api/patients", patientRoutes);

const PORT = process.env.PORT || 5000;

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}`);
  });
});
