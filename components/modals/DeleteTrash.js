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

function DeleteTrash() {
  const { showDeleteTrashModal, toggleDeleteTrashModal, deleteTrashId } =
    useModalContext()

  const supabase = useSupabaseClient()
  const user = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const deleteTrashHandler = async () => {
    setLoading(true)

    var { error } = await deleteNoteFromTrash(supabase, deleteTrashId)

    if (error) {
      return toast.error(error.message)
    }

    setLoading(false)

    toggleDeleteTrashModal()

    toast.success("Note deleted from trash!")
    refreshPage(router)
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
