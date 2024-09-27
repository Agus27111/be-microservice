const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    }

    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.data;
    next();
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message || "Internal Server Error",
    });
  }
};
