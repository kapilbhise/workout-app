const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const NoteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "NULL",
    },
  },
  {
    timestamps: true,
  }
);

// create a Note Model from NoteSchema
module.exports = mongoose.model("Note", NoteSchema);
