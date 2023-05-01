export const fetchNotes = async () => {
  const notes = await fetch("http://localhost:3000/api/notes");
  return notes.json();
};

export const fetchNote = async (id) => {
  const note = await fetch(`http://localhost:3000/api/notes/${id}`);
  return note.json();
};

export const addNote = (note) => {
  return fetch("/api/notes", {
    method: "POST",
    body: JSON.stringify({ note }),
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
  console.log(note, slug);
  return fetch(`http://localhost:3000/api/notes/${slug}`, {
    method: "PATCH",
    body: JSON.stringify({ note }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};