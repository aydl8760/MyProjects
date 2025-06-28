const mongoose = require("mongoose");

const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("Mongo db connect");
  } catch (error) {
    console.log("mongodb connection ", error);
    process.exit(1);
  }
};

module.exports = connectdb;
