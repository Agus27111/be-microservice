const { User, RefreshToken } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  try {
    const { user_id, refresh_token } = req.body;

    const Schema = {
      user_id: "number",
      refresh_token: "string",
    };

    const validate = v.validate(req.body, Schema);
    if (validate.length) {
      return res.status(400).json({
        status: "error",
        message: validate,
      });
    }

    const user = await User.findByPk(user_id);
    
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    const newRefreshToken = await RefreshToken.create({
      token: refresh_token,
      user_id: user_id,
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
