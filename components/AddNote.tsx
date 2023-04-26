"use client";

import { useState } from "react";
import useNotes from "@/hooks/useNotes";

export default function AddNote() {
  const [note, setNote] = useState("");
  const { addNote } = useNotes();

  const onClickHandler = () => {
    addNote(note);
    setNote("");
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value);
  };

  return (
    <div>
      <input
        onChange={onChangeHandler}
        value={note}
        type="text"
        className="border-2 border-rose-500 rounded"
      />
      <button onClick={onClickHandler}>Add Note</button>
    </div>
  );
}
