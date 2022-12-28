import React, { useState } from "react"
import { useAppContext } from "../../context/AppContext"
import { NOTE_TYPES } from "../../constants/notes"
import { NotificationManager } from "react-notifications"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { useRouter } from "next/router"
import { createNote, updateNoteName } from "../../core/notes"
import Spinner from "../Spinner"

function UpdateNoteName({ noteId, initialName, setNote }) {
  const { showUpdateNoteNameModal, toggleUpdateNoteNameModal } = useAppContext()
  const [name, setName] = useState(initialName)
  const supabase = useSupabaseClient()
  const [loading, setLoading] = useState(false)

  const changeName = (e) => setName(e.target.value)

  const updateNoteHandler = async () => {
    if (!name.trim().length) {
      NotificationManager.error("Please enter the name!")
      return
    }

    setLoading(true)

    const { error } = await updateNoteName(supabase, noteId, name)

    if (error) {
      return NotificationManager.error(error.message)
    }

    setNote((prevNote) => ({
      ...prevNote,
      name
    }))

    setLoading(false)

    toggleUpdateNoteNameModal()
  }

  return (
    <div
      className={[
        "modal modal-bottom sm:modal-middle",
        showUpdateNoteNameModal ? "modal-open" : null
      ].join(" ")}
    >
      <div className="modal-box">
        <h3 className="mb-6 font-semibold text-2xl">Update Note Name</h3>

        <div className="flex flex-col text-xl gap-2">
          <label htmlFor="note-name">Name</label>
          <input
            id="note-name"
            placeholder="Name of the note..."
            className="outline-none border-b-2 border-black"
            value={name}
            onChange={changeName}
          />
        </div>

        <div className="modal-action">
          <button
            className="btn bg-white text-black hover:bg-white"
            onClick={toggleUpdateNoteNameModal}
          >
            Cancel
          </button>
          <button
            onClick={updateNoteHandler}
            className="btn bg-primary hover:bg-primary gap-2"
            disabled={loading}
          >
            Update
            {loading && <Spinner />}
          </button>
        </div>
      </div>
    </div>
  )
}

export default UpdateNoteName
