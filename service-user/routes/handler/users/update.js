const bcrypt = require("bcryptjs");
const { User } = require("../../../models");
const Validator = require("fastest-validator");

const v = new Validator();

module.exports = async (req, res) => {
  try {
    const schema = {
      name: "string|empty:false",
      email: "email|empty:false",
      password: "string|min:6|empty:false",
      profession: "string|optional",
      avatar: "string|optional",
    };

    const validate = v.validate(req.body, schema);

    if (validate.length) {
      return res.status(400).json({
        status: "error",
        message: validate,
      });
    }

    const { id } = req.params;
    const idExist = await User.findOne({
      where: {
        id,
      },
    });

    if (!idExist) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    const { email } = req.body;
    const emailExist = await User.findOne({
      where: {
        email,
      },
    });

    if (emailExist && email !== idExist.email) {
      return res.status(409).json({
        status: "error",
        message: "Email already exists",
      });
    }

    const hashPass = await bcrypt.hash(req.body.password, 10);
    const { name, profession, avatar } = req.body;
    const updateUser = await idExist.update({
      name,
      email,
      password: hashPass,
      profession,
      avatar,
    });
    return res.json({
      status: "success",
      message: "User updated successfully",
      data: updateUser,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
