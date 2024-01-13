const joi = require("joi");

const register = {
  body: joi.object({
    email: joi.string().trim(),
    password: joi.string().trim(),
    role: joi.string().trim().required().valid("user", "admin", "subadmin"),
  }),
};

module.exports = {
  register,
};
