const mongoose = require("mongoose");
const User = require("../models/userModel");

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
};
