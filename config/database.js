const mongoose = require("mongoose");

const { MONGO_URL } = process.env;

exports.connect = () => {
  // Conecting to the database
  mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log("Successfully connected to database!");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.log(error);
      process.exit(1);
    });
};
