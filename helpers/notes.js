export const fetchNotes = async () => {
  const notes = await fetch("http://localhost:3000/api/notes");
  return notes.json();
};

export const fetchNote = async (id) => {
  const note = await fetch(`http://localhost:3000/api/notes/${id}`);
  return note.json();
};

export const addNote = (data) => {
  const { note, user_id } = data;
  return fetch("/api/notes", {
    method: "POST",
    body: JSON.stringify({ note_text: note, user_id }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const removeNote = (id) => {
  return fetch(`http://localhost:3000/api/notes/${id}`, {
    method: "DELETE",
  });
};

export const editNote = (note, slug) => {
  return fetch(`http://localhost:3000/api/notes/${slug}`, {
    method: "PATCH",
    body: JSON.stringify({ note_text: note }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
