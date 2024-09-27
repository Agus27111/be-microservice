const { RefreshToken } = require("../../../models");

module.exports = async (req, res) => {
  try {
    const { refreshToken } = req.query;
    
    if (!refreshToken) {
        return res.status(400).json({
          status: "error",
          message: "Refresh token is required",
        });
      }
      
    const token = await RefreshToken.findOne({
      where: {
        token: refreshToken,
      },
    });

    if (!token) {
      return res.status(404).json({
        status: "error",
        message: "Refresh token not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: token,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
