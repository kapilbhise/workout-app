import React, { useEffect } from "react";

import NoteDetails from "../components/NoteDetails";
import { useNotesContext } from "../hooks/useNotesContext";
import NoteForm from "../components/NoteForm";

const Notes = () => {
  const { notes, dispatch } = useNotesContext();
  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch(
        "https://workout-app-qvmk.onrender.com/api/notes"
      );
      const json = await response.json();
      if (response.ok) {
        return dispatch({ type: "SET_NOTES", payload: json });
      }
    };
    fetchNotes();
  }, [dispatch]);

  return (
    <div className='home'>
      <div className='workouts'>
        {notes &&
          notes.map((note) => <NoteDetails note={note} key={note._id} />)}
      </div>

      <NoteForm />
    </div>
  );
};

export default Notes;
