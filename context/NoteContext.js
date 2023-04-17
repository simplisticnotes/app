import { createContext, useContext, useEffect, useState } from "react"

const NoteContext = createContext()

export const useNoteContext = () => useContext(NoteContext)

export const NoteContextProvider = ({ children, notes: initialNotes }) => {
  const [notes, setNotes] = useState(initialNotes)

  const addNote = (note) => {
    setNotes([note, ...notes])
  }

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  const getRecentNotes = () => {
    return notes.slice(0, 5)
  }

  useEffect(() => {
    setNotes(initialNotes)
  }, [initialNotes])

  const data = {
    notes,
    addNote,
    deleteNote,
    getRecentNotes
  }

  return <NoteContext.Provider value={data}>{children}</NoteContext.Provider>
}
