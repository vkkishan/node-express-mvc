const { User } = require("../model");

const createUser = async (body) => {
  return await User.create(body);
};

const findUserByEmail = async (email) => {
  return await User.findOne(email);
};

const findUserAndUpdate = async (_id, token) => {
  return await User.findByIdAndUpdate(
    { _id },
    {
      $set: { token },
    },
    { new: true }
  );
};

const getAllUser = async (role) => {
  return await User.find(role);
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserAndUpdate,
  getAllUser,
};
