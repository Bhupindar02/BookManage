const mongoose = require("mongoose");
require("dotenv").config();
const databaseConnection = async () => {
  await mongoose
    .connect(process.env.CLOUD_URL)
    .then(() => {
      console.log("database connected successfully!");
    })
    .catch((err) => {
      console.log("db connection failed", err);
    });
};

module.exports = databaseConnection;
