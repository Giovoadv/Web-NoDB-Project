import { useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import NotesList from "./components/NotesList/noteList";
import Header from "./components/Header/Header";
import axios from "axios";

function App({ initialNotesList }) {
  const [notes, setNotes] = useState(initialNotesList);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      text: text,
      date: date.toLocaleDateString(),
    };

    axios.post(`/api/notes`, newNote).then(({ data }) => {
      setNotes(data);
    });
  };

  const deleteNote = (id) => {
    axios.post(`/api/notes/${id}/delete`).then(({ data }) => {
      console.log(data);
      setNotes(data);
    });
  };

  const editNote = (e, editedNote) => {
    e?.preventDefault();
    console.log(e, editedNote);
    /*const updatedNotes = notes.map((note) =>
      note.id === editedNote?.id ? editedNote : note
    );*/

    axios
      .post(`/api/notes/${editedNote.id}/edit`, {
        text: editedNote.text,
        date: editedNote.date,
      })
      .then(({ data }) => {
        setNotes(data);
        console.log(notes)
      });
  };

  return (
    <div className="container">
      <Header />
      <NotesList
        notes={notes}
        handleAddNote={addNote}
        handleDeleteNote={deleteNote}
        handleEdit={editNote}
      />
    </div>
  );
}

export default App;
