import React, { useEffect, useState } from "react"
import dynamic from "next/dynamic"
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })
import "react-quill/dist/quill.snow.css"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { updateNoteText } from "../../core/notes"
import { encrypt } from "../../core/encryption"
import EditorToolbar, { modules, formats } from "./EditorToolbar"

function RichText({ value, onChange, noteId }) {
  const [charactersCount, setCharactersCount] = useState(0)
  const supabase = useSupabaseClient()

  const updateNote = async () => {
    try {
      const encryptedValue = await encrypt(value)

      const { error } = await updateNoteText(supabase, noteId, encryptedValue)
      console.log(error)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // whenever the value changes, update the database
    updateNote()
  }, [value])

  return (
    <>
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
