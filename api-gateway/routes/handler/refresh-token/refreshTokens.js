const apiAdapter = require("../../apiAdapter");

const jwt = require("jsonwebtoken");

const {
  URL_SERVICE_USER,
  JWT_SECRET,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_ACCESS_TOKEN_EXPIRED,
  JWT_REFRESH_TOKEN_EXPIRED,
} = process.env;

const api = apiAdapter(URL_SERVICE_USER);

module.exports = async (req, res) => {
  try {
    const { refreshToken, email } = req.body;
    if (!refreshToken || !email) {
      return res.status(400).json({
        status: "error",
        message: "Please provide refreshToken and email",
      });
    }

    const decoded = jwt.verify(
      refreshToken,
      JWT_SECRET_REFRESH_TOKEN,
      (err, decoded) => {
        if (err) {
          return res.status(403).json({
            status: "error",
            message: err.message,
          });
        }
        return decoded;
      }
    );

    if (decoded.data.email !== email) {
      return res.status(403).json({
        status: "error",
        message: "email is not valid",
      });
    }

    await api.post("/refresh-tokens", {
      refreshToken: refreshToken,
      userId: decoded.data.id,
    });

    const token = jwt.sign({ email }, JWT_SECRET, {
      expiresIn: JWT_ACCESS_TOKEN_EXPIRED,
    });

    return res.status(200).json({
      status: "success",
      data: {
        token,
      },
    });
  } catch (error) {
    // Periksa apakah error memiliki response dari Axios
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    } else {
      return res.status(500).json({
        status: "error",
        message: error.message || "Internal Server Error",
      });
    }
  }
};
