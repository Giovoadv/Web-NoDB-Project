import deleteIcon from "../../assets/delete.svg";
import editIcon from "../../assets/edit-regular.svg";
import { useState } from "react";

const Note = ({ id, text, date, handleDeleteNote, handleEdit }) => {
  const [isEditing, setEditing] = useState(false);
  const [noteText, setNoteText] = useState(text);
  const characterLimit = 200;

  const handleChange = (e) => {
    if (characterLimit - e.target.value.length >= 0) {
      setNoteText(e.target.value);
    }
  };

  const setEditMode = () => {
    setEditing(true);
    setNoteText(text);
  }

  const handleSaveClick = (e) => {
    if (noteText.trim().length > 0) {
      handleEdit(e, noteText);
      setNoteText("");
      setEditing(false)
    }
  };

  if (!isEditing) {
    return (
      <div className="note">
        <span>{text}</span>
        <div className="note-footer">
          <small>{date}</small>
          <div></div>
          <img
            className="edit-icon"
            onClick={(e) => setEditMode()}
            src={editIcon}
          />
          <img
            className="delete-icon"
            onClick={() => handleDeleteNote(id)}
            src={deleteIcon}
            alt="DELETE"
          />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        
        <div className="note new">
          <textarea
            rows="8"
            cols="10"
            value={noteText}
            onChange={handleChange}
          ></textarea>
          <div className="note-footer">
            <small> {characterLimit - noteText.length} Remaining</small>
            <button className="save" onClick={handleSaveClick}>
              Save
            </button>
            <button className="cancel-button" onClick={() => setEditing(false)}>
              {" "}
              Cancel{" "}
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default Note;
