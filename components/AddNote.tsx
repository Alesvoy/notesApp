"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";

import { addNote } from "@/helpers/notes";

export default function AddNote() {
  const [note, setNote] = useState("");

  const { user } = useUser();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const onClickHandler = () => {
    mutation.mutate({ note, user_id: user.id });
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
