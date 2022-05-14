import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/notice");

const db = mongoose.connection;

const handleError = (error) => {
  console.log(`Error : ${error}`);
};

const handleOpen = () => {
  console.log("Connection db ✅");
};

db.on("error", handleError);
db.once("open", handleOpen);
