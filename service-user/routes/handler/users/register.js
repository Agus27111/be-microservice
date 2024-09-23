const { User } = require("../../../models");
const bcrypt = require("bcryptjs");
const Validator = require("fastest-validator");

const v = new Validator();

module.exports = async (req, res) => {
  try {
    const schema = {
      name: "string|empty:false",
      email: "email|empty:false",
      password: "string|min:6|empty:false",
      profession: "string|optional",
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
    if (user) {
      return res.status(409).json({
        status: "error",
        message: "Email already exists",
      });
    }
    const hashPass = await bcrypt.hash(req.body.password, 10);

    const data = {
      name: req.body.name,
      email: req.body.email,
      password: hashPass,
      role: "student",
      profession: req.body.profession,
    };

    const createUser = await User.create(data);

    res.status(201).json({
      status: "success",
      data: {
        id: createUser.id,
        name: createUser.name,
        email: createUser.email,
        role: createUser.role,
        profession: createUser.profession,
        created_at: createUser.created_at,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
