import { useSupabaseClient } from "@supabase/auth-helpers-react"
import React, { useEffect, useState } from "react"
import { updateNoteText } from "../../core/notes"

function PlainText({ value, onChange, noteId }) {
  const [charactersCount, setCharactersCount] = useState(0)
  const supabase = useSupabaseClient()

  useEffect(() => {
    setCharactersCount(value.length)
  }, [value])

  const updateNote = async () => {
    await updateNoteText(supabase, noteId, value)
  }

  useEffect(() => {
    // whenever the value changes, update the database
    updateNote()
  }, [value])

  return (
    <>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full block outline-none border-2 p-3 text-lg border-slate-600 h-96"
        placeholder="Write something..."
      ></textarea>
      <div className="text-right text-slate-400 mt-2">
        <p>Character count: {charactersCount}</p>
      </div>
    </>
  )
}

export default PlainText
