import React, { useState } from "react"
import { NOTE_TYPES } from "../../constants/notes"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { useRouter } from "next/router"
import { createNote, deleteNote } from "../../core/notes"
import { deleteFolder } from "../../core/folders"
import Spinner from "../Spinner"
import { useModalContext } from "../../context/ModalContext"
import { toast } from "react-hot-toast"
import { refreshPage } from "../../utils"
import { useNoteContext } from "../../context/NoteContext"
import { useFolderContext } from "../../context/FolderContext"

function DeleteItem() {
  const {
    showDeleteItemModal,
    toggleDeleteItemModal,
    deleteItemId,
    deleteType
  } = useModalContext()
  const noteContext = useNoteContext()
  const folderContext = useFolderContext()

  const supabase = useSupabaseClient()
  const user = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const deleteItemHandler = async () => {
    setLoading(true)

    if (deleteType === "Note") {
      var { error } = await deleteNote(supabase, deleteItemId)
    } else if (deleteType === "Folder") {
      var { error } = await deleteFolder(supabase, deleteItemId)
    }

    setLoading(false)

    if (error) {
      return toast.error(error.message)
    }

    toggleDeleteItemModal()

    toast.success("Deleted successfully!")

    if (deleteType === "Note") {
      noteContext.deleteNote(deleteItemId)
    }
    if (deleteType === "Folder") {
      folderContext.deleteFolder(deleteItemId)
    }
  }

  return (
    <div
      className={[
        "modal modal-bottom sm:modal-middle",
        showDeleteItemModal ? "modal-open" : null
      ].join(" ")}
    >
      <div className="modal-box">
        <h3 className="mb-6 font-semibold text-2xl">
          Do you want to delete this {deleteType}?
        </h3>

        <div className="modal-action">
          <button
            className="btn btn-outline"
            onClick={() => toggleDeleteItemModal()}
          >
            Cancel
          </button>
          <button
            onClick={deleteItemHandler}
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

export default DeleteItem
