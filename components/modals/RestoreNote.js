import React, { useState } from "react"
import { NOTE_TYPES } from "../../constants/notes"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { useRouter } from "next/router"
import { createNote, deleteNote, restoreNote } from "../../core/notes"
import { deleteFolder } from "../../core/folders"
import Spinner from "../Spinner"
import { useModalContext } from "../../context/ModalContext"
import { toast } from "react-hot-toast"
import { refreshPage } from "../../utils"
import { useNoteContext } from "../../context/NoteContext"

function RestoreNote() {
  const { restoreNoteId, showRestoreNoteModal, toggleRestoreNoteModal } =
    useModalContext()
  const { deleteTrashNote } = useNoteContext()

  const supabase = useSupabaseClient()
  const user = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const restoreNoteHandler = async () => {
    setLoading(true)

    var { error } = await restoreNote(supabase, restoreNoteId)

    setLoading(false)

    if (error) {
      return toast.error(error.message)
    }

    toggleRestoreNoteModal()

    toast.success("Note restored successfully!")

    deleteTrashNote(restoreNoteId)
  }

  return (
    <div
      className={[
        "modal modal-bottom sm:modal-middle",
        showRestoreNoteModal ? "modal-open" : null
      ].join(" ")}
    >
      <div className="modal-box">
        <h3 className="mb-6 font-semibold text-2xl">
          Do you want to restore this note?
        </h3>

        <div className="modal-action">
          <button
            className="btn btn-outline"
            onClick={() => toggleRestoreNoteModal()}
          >
            Cancel
          </button>
          <button
            onClick={restoreNoteHandler}
            className="btn btn-primary"
            disabled={loading}
          >
            Restore
            {loading && <Spinner />}
          </button>
        </div>
      </div>
    </div>
  )
}

export default RestoreNote
