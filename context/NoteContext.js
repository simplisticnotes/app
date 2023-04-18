import { createContext, useContext, useEffect, useState } from "react"

const NoteContext = createContext()

export const useNoteContext = () => useContext(NoteContext)

export const NoteContextProvider = ({
  children,
  notes: initialNotes,
  trashNotes: initialTrashNotes
}) => {
  const [notes, setNotes] = useState(initialNotes || [])
  const [trashNotes, setTrashNotes] = useState(initialTrashNotes || [])

  const addNote = (note) => {
    setNotes([note, ...notes])
  }

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  const getRecentNotes = () => {
    return notes.slice(0, 5)
  }

  const deleteTrashNote = (id) => {
    setTrashNotes(trashNotes.filter((note) => note.id !== id))
  }

  const clearTrashNotes = () => {
    setTrashNotes([])
  }

  useEffect(() => {
    setNotes(initialNotes || [])
  }, [initialNotes])

  useEffect(() => {
    setTrashNotes(initialTrashNotes || [])
  }, [initialTrashNotes])

  const data = {
    notes,
    addNote,
    deleteNote,
    getRecentNotes,
    trashNotes,
    deleteTrashNote,
    clearTrashNotes
  }

  return <NoteContext.Provider value={data}>{children}</NoteContext.Provider>
}
