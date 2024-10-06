const mongoose = require("mongoose");
const STRINGS = require("../utils/constants");

mongoose.connect(
  process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/${STRINGS.EHR_DB}`
);

module.exports = mongoose.connection;
