import Note from "../Notes/note.jsx";
import AddNote from "../AddNote/AddNote.jsx";

const NotesList = ({ notes, handleAddNote, handleDeleteNote, handleEdit }) => {
  
  const updateText = (e, note, newText)=>{
    note.text = newText;
    handleEdit(e,note)
  }
  
  return (
    <div className="notes-list">
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          text={note.text}
          date={note.date}
          handleDeleteNote={handleDeleteNote}
          handleEdit = {(e, newText) => updateText(e,note, newText)}
        />
      ))}
      <AddNote handleAddNote={handleAddNote} />
    </div>
  );
};

export default NotesList;
