const bcrypt = require("bcryptjs");
const { User } = require("../../../models");
const Validator = require("fastest-validator");
const jwt = require("jsonwebtoken");

const v = new Validator();

module.exports = async (req, res) => {
  try {
    const schema = {
      email: "email|empty:false",
      password: "string|min:6",
    };

    const validate = v.validate(req.body, schema);
    if (validate.length) {
      return res.status(400).json({
        status: "error",
        message: validate,
      });
    }

    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return res.status(404).json({
        status: "error",
        message: "Wrong password",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      status: "success",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        profession: user.profession,
        avatar: user.avatar,
        role: user.role,
        token: user.token,
      },
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
