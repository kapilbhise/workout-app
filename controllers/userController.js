const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// create Token
const createToken = (_id) => {
  // payload i.e. data to be sent with the token
  //secret key to be used
  //other options like token expiration time
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login route
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    // create a token for the user by passing his _id
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  
};
// signup route
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    // create a token for the user by passing his _id
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get All Users
const getAllUsers = async (req, res) => {
  res.json({ mssg: "GET all users" });
};

// get Single User
const getSingleUser = async (req, res) => {
  res.json({ mssg: "GET single user" });
};

// create new user -signup
const createUser = async (req, res) => {
  res.json({ mssg: "POST create user" });
};

// update a specific user
const updateUser = async (req, res) => {
  res.json({ mssg: "PATCH update user" });
};

// delete a specific user
const deleteUser = async (req, res) => {
  res.json({ mssg: "DELETE a user" });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  loginUser,
  signupUser,
};
