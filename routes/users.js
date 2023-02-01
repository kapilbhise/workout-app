const express = require('express');
const { getAllUsers, getSingleUser, createUser, updateUser, deleteUser } = require('../controllers/userController');
const router=express.Router();

// get all users
router.get('/', getAllUsers);

// get single user
router.get('/:id', getSingleUser);

// create user
router.post('/', createUser);

// update user
router.patch('/:id', createUser);

// delete user
router.delete('/:id', deleteUser);

module.exports = router;
