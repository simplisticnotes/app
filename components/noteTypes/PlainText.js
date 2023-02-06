import { useSupabaseClient } from "@supabase/auth-helpers-react"
import React, { useEffect, useRef, useState } from "react"
import { updateNoteText } from "../../core/notes"
import { encrypt } from "../../core/encryption"

function PlainText({ value, onChange, noteId }) {
  const [charactersCount, setCharactersCount] = useState(0)
  const supabase = useSupabaseClient()
  const textareaRef = useRef(null)

  useEffect(() => {
    setCharactersCount(value.length)
  }, [value])

  useEffect(() => {
    const textarea = textareaRef.current
    textarea.style.height = textarea.scrollHeight + "px"
  }, [value])

  const updateNote = async () => {
    const encryptedValue = await encrypt(value)

    await updateNoteText(supabase, noteId, encryptedValue)
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
        className="w-full block outline-none border-2 p-3 text-lg border-slate-600 min-h-[378px] h-auto overflow-hidden"
        placeholder="Write something..."
        ref={textareaRef}
      ></textarea>

      <section className="flex justify-end text-slate-400 mt-2">
        {/* TODO: Add last updated */}
        {/* <p>Last updated: {moment(updatedAt).fromNow()}</p> */}
        <p>Character count: {charactersCount}</p>
      </section>
    </>
  )
}

export default PlainText
