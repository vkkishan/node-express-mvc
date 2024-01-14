const joi = require("joi");

const register = {
  body: joi.object().keys({
    email: joi.string().trim(),
    password: joi.string().trim(),
    role: joi.string().trim().required().valid("user", "admin", "subadmin"),
  }),
  parmas: joi.object().keys({
    name : joi.string().trim().required(),
  }),
};

module.exports = {
  register,
};
