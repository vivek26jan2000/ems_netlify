const mongoose = require("mongoose");

const connectDB = async (url) => {
  await mongoose
    .connect(url)
    .then((data) => {
      console.log("Mongodb server connected to " + data.connection.host);
    })
    .catch((err) => console.log(err));
};
module.exports = connectDB;
