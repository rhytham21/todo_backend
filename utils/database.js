const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(
    `mongodb+srv://rhythamchaudhary21:todoapp@todo.w1q72.mongodb.net/?retryWrites=true&w=majority&appName=todo`
  );
  if (conn) return console.log("Database connected");
};

module.exports = connectDB;
