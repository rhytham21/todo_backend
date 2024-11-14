exports.isLoggedIn = async (req, res, next) => {
  try {
    if (!req?.user) {
      res.status(401).json({ success: false, message: "Unauthorized" });
    }
    next();
  } catch (error) {
    next(error);
  }
};
