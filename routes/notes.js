const express = require("express");
const {
  getAllNotes,
  getSingleNote,
  createANote,
  deleteANote,
  updateANote,
} = require("../controllers/noteController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);
// get all notes
router.get("/", getAllNotes);

// get a single note
router.get("/:id", getSingleNote);

// create a new note
router.post("/", createANote);

// delete a  specific note
router.delete("/:id", deleteANote);

// update a specific note
router.patch("/:id", updateANote);

module.exports = router;
