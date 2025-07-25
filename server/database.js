const mongoose = require("mongoose");
require("dotenv").config();
const databaseConnection = async () => {
  await mongoose
    .connect(process.env.CLOUD_URL)
    .then(() => {
      console.log("Database Connected Sucessfully !");
    })
    .catch((err) => {
      console.log("database connection fail:", err);
    });
};

module.exports = databaseConnection;
