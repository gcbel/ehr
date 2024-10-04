const express = require("express");
const mongoose = require("mongoose");
const patientRoutes = require("./routes/patientRoutes");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/yourdbname", {});

app.use("/api/patients", patientRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
