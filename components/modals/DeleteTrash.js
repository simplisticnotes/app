import React, { useState } from "react"
import { NOTE_TYPES } from "../../constants/notes"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { useRouter } from "next/router"
import {
  createNote,
  deleteNote,
  deleteNoteFromTrash,
  restoreNote
} from "../../core/notes"
import { deleteFolder } from "../../core/folders"
import Spinner from "../Spinner"
import { useModalContext } from "../../context/ModalContext"
import { toast } from "react-hot-toast"
import { refreshPage } from "../../utils"
import { useNoteContext } from "../../context/NoteContext"

function DeleteTrash() {
  const { showDeleteTrashModal, toggleDeleteTrashModal, deleteTrashId } =
    useModalContext()
  const { deleteTrashNote } = useNoteContext()

  const supabase = useSupabaseClient()
  const user = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const deleteTrashHandler = async () => {
    setLoading(true)

    var { error } = await deleteNoteFromTrash(supabase, deleteTrashId)

    setLoading(false)

    if (error) {
      return toast.error(error.message)
    }

    toggleDeleteTrashModal()

    toast.success("Note deleted from trash!")

    deleteTrashNote(deleteTrashId)
  }

  return (
    <div
      className={[
        "modal modal-bottom sm:modal-middle",
        showDeleteTrashModal ? "modal-open" : null
      ].join(" ")}
    >
      <div className="modal-box">
        <h3 className="mb-6 font-semibold text-2xl">
          This note will be deleted permanently, are you sure?
        </h3>

        <div className="modal-action">
          <button
            className="btn btn-outline"
            onClick={() => toggleDeleteTrashModal()}
          >
            Cancel
          </button>
          <button
            onClick={deleteTrashHandler}
            className="btn btn-error"
            disabled={loading}
          >
            Delete
            {loading && <Spinner />}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteTrash
