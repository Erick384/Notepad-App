import React, { useEffect, useState } from "react";
import { Client, Databases, ID } from "appwrite";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  // State variables
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "test note 1",
      content: "bla bla note1",
    },
    // ... other notes ...
  ]);

  // APPWRIRE============================================
  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("65268afae6d40bb318c6");

  const databases = new Databases(client);
  // ===============================================
  // Function to add a new note
  useEffect(() => {
    fetchNotes();
  }, []);
  const handleAddNote = async (event) => {
    event.preventDefault();
    try {
      const newNote = {
        title: title,
        content: content,
      };
      // setNotes([newNote, ...notes]);
      const response = await databases.createDocument(
        "65268b448e885e57bd2f",
        "65268b8b248f48b848c9",
        ID.unique(),
        newNote
      );
      console.log(response);
      toast("Added successfully");
      setTitle("");
      setContent("");
    } catch (error) {
      console.error(error.message);
      setError(error.message);
      toast(error.message);
    }
  };
  const fetchNotes = async () => {
    try {
      const {documents} = await databases.listDocuments(
        "65268b448e885e57bd2f",
        "65268b8b248f48b848c9"
      );
      console.log(documents);
      setNotes(documents);
    } catch (error) {
      toast(error.message);
    }
  };
  // Function to handle a click on a note
  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  // Function to update a note
  const handleUpdateNote = (event) => {
    event.preventDefault();

    if (!selectedNote) {
      return;
    }

    const updatedNote = {
      id: selectedNote.id,
      title: title,
      content: content,
    };

    const updatedNotesList = notes.map((note) =>
      note.id === selectedNote.id ? updatedNote : note
    );

    setNotes(updatedNotesList);
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  // Function to cancel note editing
  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  // Function to delete a note
  const deleteNote = function (event, noteId) {
    event.stopPropagation();

    const updatedNotes = notes.filter(function (note) {
      return note.id !== noteId;
    });

    setNotes(updatedNotes);
  };

  return (
    <div className="app-container">
      <form
        className="note-form"
        onSubmit={(event) =>
          selectedNote ? handleUpdateNote(event) : handleAddNote(event)
        }
      >
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title"
          required
        ></input>
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Content"
          rows={10}
          required
        ></textarea>

        {selectedNote ? (
          <div className="edit-buttons">
            <button type="submit">Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <button type="submit">Add Note</button>
        )}
      </form>
      <div className="notes-grid">
        {notes && notes.map((note,index) => (
          <div
            className="note-item"
            key={index}
            onClick={() => handleNoteClick(note)}
          >
            <div className="notes-header">
              <button onClick={(event) => deleteNote(event, note.id)}>x</button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
