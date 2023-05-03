"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { editNote, fetchNote } from "../../../helpers/notes";

export default function NotePage({ params }) {
  const [note, setNote] = useState("");
  const router = useRouter();
  const { slug } = params;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", slug],
    queryFn: () => fetchNote(slug),
    onSuccess: (data) => {
      setNote(data.note_text);
    },
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => editNote(note, slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["note", slug] });
    },
  });

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error...</p>;

  return (
    <div>
      <input
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button
        className="rounded bg-yellow-400 p-1"
        onClick={() => mutation.mutate()}
      >
        Edit
      </button>
      <button
        className="rounded bg-black text-white p-1"
        onClick={() => router.push("/notes")}
      >
        Go Back
      </button>
    </div>
  );
}
