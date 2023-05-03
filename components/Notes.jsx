"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import AddNote from "./AddNote";
import { fetchNotes, removeNote } from "../helpers/notes";

export default function Notes() {
  const router = useRouter();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes"],
    queryFn: fetchNotes,
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: removeNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error...</p>;

  return (
    <div>
      <AddNote />
      {data.rows
        ? data.rows
            .map((note) => {
              return (
                <div key={note.note_id} className="flex gap-2">
                  <p>{note.note_text}</p>
                  <button
                    onClick={() => router.push(`/notes/${note.note_id}`)}
                    className="rounded bg-yellow-400 p-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => mutation.mutate(note.note_id)}
                    className="rounded bg-red-500 p-1"
                  >
                    Delete
                  </button>
                </div>
              );
            })
            .reverse()
        : null}
    </div>
  );
}
