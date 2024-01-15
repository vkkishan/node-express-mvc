const joi = require("joi");

const register = {
  body: joi.object().keys({
    email: joi.string().trim(),
    password: joi.string().trim(),
    role: joi.string().trim().required().valid("user", "admin", "subadmin"),
  }),
  params: joi.object().keys({
    name: joi.number().required(),
  }),
};

module.exports = {
  register,
};
