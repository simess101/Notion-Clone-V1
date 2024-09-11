import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');

  // Load saved notes from localStorage when the component mounts
  useEffect(() => {
    try {
      const savedNotes = localStorage.getItem('notes');
      if (savedNotes) {
        console.log("Loaded notes from localStorage:", savedNotes);
        setNotes(JSON.parse(savedNotes));
      } else {
        console.log("No notes found in localStorage.");
      }
    } catch (error) {
      console.error("Error loading notes from localStorage:", error);
    }
  }, []);

  // Save notes to localStorage whenever the notes state changes
  useEffect(() => {
    try {
      if (notes.length > 0) {
        localStorage.setItem('notes', JSON.stringify(notes));
        console.log("Notes saved to localStorage:", notes);
      }
    } catch (error) {
      console.error("Error saving notes to localStorage:", error);
    }
  }, [notes]);

  // Add a new note
  const addNote = () => {
    if (input.trim()) {
      const newNotes = [...notes, { text: input, completed: false }];
      setNotes(newNotes);
      setInput(''); // Clear the input field
    }
  };

  // Delete a note
  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  // Toggle note completion
  const toggleComplete = (index) => {
    const updatedNotes = notes.map((note, i) =>
      i === index ? { ...note, completed: !note.completed } : note
    );
    setNotes(updatedNotes);
  };

  // Move a note up or down
  const moveNote = (index, direction) => {
    const newNotes = [...notes]; // Clone the array
    const [movedNote] = newNotes.splice(index, 1); // Remove the selected note
    newNotes.splice(index + direction, 0, movedNote); // Insert at the new position
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
