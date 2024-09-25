const { User } = require("../../../models");

module.exports = async (req, res) => {
  try {
    const userIds = req.query.user_ids || [];
    const sqlOptions = {
      attributes: {
        exclude: ["password"],
      },
    };

    if (userIds.length > 0) {
      sqlOptions.where = {
        id: userIds,
      };
    }

    const users = await User.findAll(sqlOptions);

    return res.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
