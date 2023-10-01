import "./App.css";

function App() {


  return (
    <div className="app-container">

{/* <div className="notes-grid">
  {notes.map((note) => (
    <div className="note-item">
      <div className="notes-header">
        <button>x</button>
      </div>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
    </div>
  ))}
</div> */}


      <form className="note-form">
        <input placeholder="Title" required />
        <textarea placeholder="Content" rows={10} required />

        <button type="submit">Add Note</button>
      </form>
      <div className="notes-grid">
        <div className="note-item">
          <div className="notes-header">
            <button>x</button>
          </div>
          <h2>Note Title</h2>
          <p>Note content</p>
        </div>
      </div>
    </div>
  );
}

export default App;
