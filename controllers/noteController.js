const mongoose = require("mongoose");
const Note = require("../models/noteModel");

// get all workouts
const getAllNotes = async (req, res) => {
  const notes = await Note.find({}).sort({ createadAt: -1 });
  console.log("Notes are\n");
  console.log(notes);
  res.status(200).json(notes);
  // res.json({ mssg: "GET all notes" });
};

// get single note
const getSingleNote = async (req, res) => {
  // const note= Note.find({id: req.params.id});
  // console.log("Note is\n");
  // console.log(note);
  // res.status(200).json(note);
  res.json({ mssg: "GET single note" });
};

//create single note
const createANote = async (req, res) => {
  const note = req.body;
  console.log(note);
  Note.create(note);
  res.json(note);
};

// delete a single note
const deleteANote = async (req, res) => {
  res.json({ mssg: "DELETE delete single note" });
};

// update a single note
const updateANote = async (req, res) => {
  res.json({ mssg: "UPDATE update single note" });
};

module.exports = {
  getAllNotes,
  getSingleNote,
  createANote,
  updateANote,
  deleteANote,
};
