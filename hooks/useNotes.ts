import { useEffect, useState } from "react";

const useNotes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchData(setNotes);
  }, [notes.length]);

  const addNote = async (note) => {
    const response = await fetch("/api/notes", {
      method: "POST",
      body: JSON.stringify({ note }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setNotes((prev) => [...prev, { note_id: Math.random(), note_text: note }]);
  };

  const removeNote = async (id) => {
    await fetch(`http://localhost:3000/api/notes/${id}`, {
      method: "DELETE",
    });
    setNotes(notes.filter((note) => note.note_id !== id));
  };

  return { notes, addNote, removeNote };
};

const fetchData = async (setNotes) => {
  const notes = await fetch("http://localhost:3000/api/notes");
  const data = await notes.json();
  setNotes([...data.rows]);
};

export default useNotes;
