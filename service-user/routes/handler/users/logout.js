const { User, RefreshToken } = require("../../../models");

module.exports = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    const deleteToken = await RefreshToken.destroy({
      where: {
        user_id: userId,
      },
    });

    if (!deleteToken) {
      return res.status(404).json({
        status: "error",
        message: "Failed to logout",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Logout success",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
