const User = require("../model/userSchema");
const bcrypt = require("bcrypt");
const { tokenGenerator, verifyToken } = require("../helpers/jwt");

exports.registerUser = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;
    if (!email || !email.length)
      return res
        .send(400)
        .json({ success: false, message: "Please enter valid Email" });
    if (!name || !name.length)
      return res
        .send(400)
        .json({ success: false, message: "Please enter valid Name" });
    if (!password || !password.length)
      return res
        .send(400)
        .json({ success: false, message: "Please enter valid password" });

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email: email,
      name: name,
      password: encryptedPassword,
    });

    await newUser.save();
    res.status(200).json({ newUser, message: "User registration successfull" });
  } catch (error) {
    next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    console.log("Was here => ");
    const { email, name, password } = req?.body;
    if (!email || !email.length)
      return res.status(400).json({ success: false, message: "" });
    if (!name || !name.length)
      return res.status(400).json({ success: false, message: "" });
    if (!password || !password.length)
      return res.status(400).json({ success: false, message: "" });

    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "user not found" });

    const passwordMatch = await bcrypt.compare(password, user?.password);
    if (!passwordMatch)
      return res
        .status(401)
        .json({ success: false, message: "Password incorrect" });

    console.log("Was herer");
    //generate token
    const token = tokenGenerator({ _id: user._id, email: user.email });
    return res
      .status(200)
      .json({ success: true, token: token, message: "Login successfull" });
  } catch (error) {
    next(error);
  }
};
