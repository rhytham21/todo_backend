const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const taskRouter = require("./routes/taskRoutes");
const connectDB = require("./utils/database");
const userRouter = require("./routes/userRoutes");
const { verifyToken } = require("./helpers/jwt");
const User = require("./model/userSchema");

app.use(cors());

app.use(express.json());

connectDB();

const port = 4001;

app.use(async (req, res, next) => {
  try {
    if (
      req?.headers?.authorization &&
      req?.headers?.authorization.startsWith("Bearer ")
    ) {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = await verifyToken(token);
      console.log("Decoded", decoded);

      let user = await User.findOne({ _id: decoded._id });
      console.log("User in middleware => ", user);
      if (!user)
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized. User not found" });

      req.user = user;
    }
    next();
  } catch (error) {
    next(error);
  }
});

app.use((req, res, next) => {
  console.log("User => ", req?.user);
  next();
});

app.use("/task", taskRouter);
app.use("/user", userRouter);

app.use("/", (req, res) => {
  return res.status(200).json({ success: true, message: "Base api hit" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
