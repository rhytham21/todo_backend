const jwt = require("jsonwebtoken");

exports.tokenGenerator = (user) => {
  console.log("Was in token generation. user => ", user);
  
  const token = jwt.sign({ _id: user._id }, "todorhytham", {
    expiresIn: "10d",
  });
  console.log("Token Generated");
  return token || null;
};

exports.verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, "todorhytham", (err, decode) => {
      if (err) {
        reject(err);
      } else {
        resolve(decode);
      }
    });
  });
};
