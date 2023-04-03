import React, { useEffect, useState } from "react"
import dynamic from "next/dynamic"
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })
import "react-quill/dist/quill.snow.css"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { updateNoteText } from "../../core/notes"
// import EditorToolbar, { modules, formats } from "./EditorToolbar"
import axios from "axios"
import { useLeavePageConfirmation } from "../../hooks/useLeavePageConfirmation"
import { routeChangeDialogue } from "../../utils"

function RichText({ value, onChange, noteId }) {
  const [charactersCount, setCharactersCount] = useState(0)
  const supabase = useSupabaseClient()
  const [saving, setSaving] = useState(false)

  useLeavePageConfirmation(
    saving,
    "Changes in the note will be lost if you leave the page!",
    routeChangeDialogue
  )

  const updateNote = async () => {
    setSaving(true)

    const res = await axios.post("/api/encrypt", { text: value })

    await updateNoteText(supabase, noteId, res.data.encryptedText)

    setSaving(false)
  }

  useEffect(() => {
    // whenever the value changes, update the database
    updateNote()
  }, [value])

  return (
    <>
      <p className="text-slate-400">{saving ? "Saving..." : "Saved"}</p>
      {/* <EditorToolbar /> */}
      <ReactQuill
        theme="snow"
        value={value}
        onChange={(value, _, __, editor) => {
          onChange(value)
          setCharactersCount(editor.getLength() - 1)
        }}
        // modules={modules}
        // formats={formats}
      />

      <div className="flex justify-end text-slate-400 mt-2">
        {/* TODO: Add last updated */}
        <p>Character count: {charactersCount}</p>
      </div>
    </>
  )
}

export default RichText

// For Reference

//   const modules = {
//     toolbar: [
//       [{ header: [1, 2, 3, 4, false] }],
//       ["bold", "italic", "underline", "strike", "blockquote"],
//       [
//         { list: "ordered" },
//         { list: "bullet" },
//         { indent: "-1" },
//         { indent: "+1" },
//       ],
//       ["link", "image"],
//       ["clean"],
//     ],
//   };

//   const formats = [
//     "header",
//     "bold",
//     "italic",
//     "underline",
//     "strike",
//     "blockquote",
//     "list",
//     "bullet",
//     "indent",
//     "link",
//     "image",
//   ];

// <ReactQuill
//       theme="snow"
//       value={value}
//       onChange={(value, _, __, editor) => {
//         onChange(value)
//         setCharactersCount(editor.getLength() - 1)
//       }}

//         modules={modules}
//         formats={formats}
//     />
