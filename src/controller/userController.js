const { User } = require("../model/index");
const joi = require("joi");
const bcrypt = require("bcrypt");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const jwtSecrectKey = "cdccsvavsvfssbtybnjnu";
const { userService } = require("../service");
const { auth } = require("../middleware/auth");

// const validation = {
//   body: joi.object.keys({
//     email: joi.string(),
//     password: joi.string(),
//   }),
// };

const register = async (req, res) => {
  // validation;
  const { email, password, role } = req.body;

  const hashPassword = await bcrypt.hash(password, 8);

  let option = {
    email,
    role,
    exp: moment().add(1, "days").unix(),
  };

  const token = await jwt.sign(option, jwtSecrectKey);

  const filter = {
    email,
    role,
    password: hashPassword,
    token,
  };

  const data = await userService.createUser(filter);

  res.status(200).json({ data });
};

const login = async (req, res) => {
  try {
    // validation;
    const { email, password } = req.body;

    const findUser = await userService.findUserByEmail({ email });

    if (!findUser) throw Error("User not found");

    const successPassword = bcrypt.compare(password, findUser.password);
    if (!successPassword) throw Error("Incorrect password");

    let option = {
      email,
      role: findUser.role,
      exp: moment().add(1, "days").unix(),
    };

    let token;
    if (findUser && successPassword) {
      token = jwt.sign(option, jwtSecrectKey);
    }

    let data;
    if (token) {
      data = await userService.findUserAndUpdate(findUser._id, token);
    }

    res.status(200).json({ data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getAllUser = async (req, res) => {
  try {
    // const user = await auth(req.headers.token, ["user", "admin"]);

    const data = await userService.getAllUser({ role: "user" });
    res.status(200).json({ data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  getAllUser,
};
