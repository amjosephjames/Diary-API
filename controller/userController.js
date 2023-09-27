const bcrypt = require("bcrypt");
const userModel = require("../model/userModel");

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      username,
      email,
      password: hashed,
    });
    return res.status(201).json({
      message: "created successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};
const getOneUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findById(id);
    return res.status(200).json({
      message: "one user found",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};
const getAllUser = async (req, res) => {
  try {
    const user = await userModel.find();
    return res.status(200).json({
      message: "all users found",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};
const updateUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findByIdAndUpdate(
      req.params.id,
      { email },
      { new: true }
    );
    return res.status(200).json({
      message: "updated successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      message: "deleted successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};

const signinUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await userModel.findOne({ email });

    if (findUser) {
      const checkPassword = await bcrypt.compare(password, findUser.password);

      if (checkPassword) {
        const { ...info } = findUser._doc;

        return res
          .status(200)
          .json({ message: `welcome back ${findUser.userName}`, data: info });
      } else {
        return res.status(404).json({ message: `password isn't correct` });
      }
    } else {
      return res.status(404).json({ message: `user doesn't exist` });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUser,
  getOneUser,
  getAllUser,
  updateUser,
  deleteUser,
  signinUser,
};
