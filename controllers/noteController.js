const mongoose = require("mongoose");
const Note = require("../models/noteModel");

// get all workouts
const getAllNotes = async (req, res) => {
  const user_id = req.user._id.valueOf();
  const notes = await Note.find({ user_id: user_id }).sort({ createadAt: -1 });
  // console.log("Notes are\n");
  // console.log(notes);
  if (notes.length <= 0) {
    return res.status(404).json({ message: "No notes found" });
  }
  return res.status(200).json(notes);
  // res.json({ mssg: "GET all notes" });
};

// get single note
const getSingleNote = async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  //if the id is not in valid format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log("Invalid note id");
    return res.status(404).json({ message: "No such note found." });
  }
  const note = await Note.findById(id);

  // else if no note is found
  if (note == null) {
    return res.status(404).json({ message: "No such note found." });
  }

  // if note is found
  // console.log("Note is:");
  // console.log(note);
  return res.status(200).json(note);
};

//create single note
const createANote = async (req, res) => {
  const { title, description } = req.body;
  const user_id = req.user._id.valueOf();
  console.log(user_id);
  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!description) {
    emptyFields.push("description");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }
  console.log(title, description, user_id);

  try {
    const newNote = await Note.create({
      title: title,
      description: description,
      user_id: user_id,
    });
    console.log(user_id, newNote);
    return res.status(201).json(newNote);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// delete a single note
const deleteANote = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log("Error: Invalid note id");
    return res.status(400).send({ message: "No such note" });
  }
  const note = await Note.findOneAndDelete({ _id: id });
  // if note is not found
  if (!note) {
    console.log("Error: Invalid note id");
    return res.status(400).send({ message: "No such note" });
  }

  return res.status(200).json(note);
};

// update a single note
const updateANote = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log("Error: Invalid note id");
    return res.status(400).send({ message: "No such note" });
  }

  const note = await Note.findOneAndUpdate({ _id: id }, { ...req.body });
  // if note is not found
  if (!note) {
    console.log("Error: Invalid note id");
    return res.status(400).send({ message: "No such note" });
  }
  //if note is found
  return res.status(200).json(note);
};

module.exports = {
  getAllNotes,
  getSingleNote,
  createANote,
  updateANote,
  deleteANote,
};
