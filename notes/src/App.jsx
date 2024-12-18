import Note from './components/Note'
import { useEffect, useState } from 'react'
import noteService from './services/note'
import Notification from './components/Notification'

const Footer=()=>{
  const footerStyle={
    color:'green',
    fontStyle:'italic',
    fontSize:16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinski 2024</em>
    </div>
  )
}

const App = (props) => {
  const [notes, setNotes]=useState([])
  const [newNote, setNewNote]=useState('a new note...')
  const [showAll, setShowAll]=useState(true)
  const [errorMsg, setErrorMsg]=useState(null)
  
  const hook=()=>{
    console.log('effect')
    noteService
      .getAll()
      .then(initialNotes=>{
        console.log('promise fulfilled')
        setNotes(initialNotes)
      })
  }
  useEffect(hook,[])
  console.log('render',notes.length,'notes')

  const addNote=(ev)=>{
    ev.preventDefault()
    console.log('button clicked',ev.target)
    const noteObject={
      content: newNote,
      important: Math.random()<0.5,
      id: String(notes.length+1)
    }
    noteService
      .create(noteObject)
      .then(newNote=>{
        console.log('new note',newNote)
        setNotes(notes.concat(newNote))
        setNewNote('')
      })
  }
  const handleNoteChange=(ev)=>{
    console.log('handleNoteChange',ev.target.value)
    setNewNote(ev.target.value)
  }
  const notetoShow=showAll ? notes : notes.filter(
    (note)=>note.important
  )

  const toggleImportanceOf =(id) => {
    const note=notes.find(n=>n.id===id)
    const changedNote = {...note, important: !note.important}
    noteService
      .update(id, changedNote)
      .then(updatedNote=>{
        setNotes(notes.map(n => n.id===id ? updatedNote : n))
      }).catch(error=>{
        setErrorMsg(`the note '${note.content}' was already deleted from server`)
        setTimeout(()=>{setErrorMsg(null)},5000)
        setNotes(notes.filter(n => n.id !== id))
      })

  }
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMsg}/>
      <div>
        <button onClick={()=>setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notetoShow.map(note => 
          <Note key={note.id} note={note} 
            toggleImportance={()=>toggleImportanceOf(note.id)}/>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App