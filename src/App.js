import React, { useState } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');

  const addNote = () => {
    if (input.trim()) {
      setNotes([...notes, { text: input, completed: false }]);
      setInput('');
    }
  };

  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const toggleComplete = (index) => {
    setNotes(notes.map((note, i) => 
      i === index ? { ...note, completed: !note.completed } : note
    ));
  };

  const moveNote = (index, direction) => {
    const newNotes = [...notes];
    const [movedNote] = newNotes.splice(index, 1);
    newNotes.splice(index + direction, 0, movedNote);
    setNotes(newNotes);
  };

  return (
    <div className="container">
      <h1>Notion Clone</h1>
      <input
        type="text"
        placeholder="Enter a note"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && addNote()}
      />
      <button onClick={addNote}>Add Note</button>

      <ul className="note-list">
        {notes.map((note, index) => (
          <li key={index} className={`note-item ${note.completed ? 'completed' : ''}`}>
            <span className="note-text" onClick={() => toggleComplete(index)}>
              {note.text}
            </span>
            <div className="note-controls">
              <button onClick={() => moveNote(index, -1)} disabled={index === 0}>↑</button>
              <button onClick={() => moveNote(index, 1)} disabled={index === notes.length - 1}>↓</button>
              <button className="delete" onClick={() => deleteNote(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
