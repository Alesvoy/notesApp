"use client";

import { useEffect, useState } from "react";
import useNotes from "@/hooks/useNotes";
import AddNote from "./AddNote";

export default function Notes() {
  const { notes, removeNote } = useNotes();
  console.count("Notes.tsx");

  return (
    <div>
      <AddNote />
      {notes.map((note) => {
        return (
          <div key={note.note_id} className="flex gap-2">
            <p>{note.note_text}</p>
            <button
              onClick={() => removeNote(note.note_id)}
              className="rounded bg-red-500 p-1"
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}
