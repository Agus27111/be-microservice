const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized: No token provided",
      });
    }

    const token = authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized: Invalid token format",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.data;
    next();
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      return res.status(401).json({
        status: "error",
        message: "Invalid or expired token",
      });
    }

    return res.status(500).json({
      status: "error",
      message: error.message || "Internal Server Error",
    });
  }
};
