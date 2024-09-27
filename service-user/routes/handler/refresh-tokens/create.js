const { User, RefreshToken } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  try {
    const { userId } = req.body;
    const { refreshToken } = req.body;

    const Schema = {
      userId: "number",
      refreshToken: "string",
    };

    const validate = v.validate(req.body, Schema);
    if (validate.length) {
      return res.status(400).json({
        status: "error",
        message: validate,
      });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    const newRefreshToken = await RefreshToken.create({
      token: refreshToken,
      user_id: userId,
    });

    return res.status(200).json({
      status: "success",
      data: {
        refresh_token: newRefreshToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
