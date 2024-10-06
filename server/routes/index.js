/* DEPENDENCIES */
const router = require("express").Router();

/* ROUTES */
const patientRoutes = require("./patientRoutes");

router.use("/patients", patientRoutes);

/* EXPORTS */
module.exports = router;
