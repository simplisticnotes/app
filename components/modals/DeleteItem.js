import React, { useState } from "react"
import { NOTE_TYPES } from "../../constants/notes"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { useRouter } from "next/router"
import { createNote, deleteNote } from "../../core/notes"
import Spinner from "../Spinner"
import { useModalContext } from "../../context/ModalContext"
import { toast } from "react-hot-toast"

function DeleteItem() {
  const {
    showDeleteItemModal,
    toggleDeleteItemModal,
    deleteItemId,
    deleteType
  } = useModalContext()

  const supabase = useSupabaseClient()
  const user = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const deleteItemHandler = async () => {
    setLoading(true)

    if (deleteType === "Note") {
      var { error } = await deleteNote(supabase, deleteItemId)
    }

    if (error) {
      return toast.error(error.message)
    }

    setLoading(false)

    toggleDeleteItemModal()

    toast.success("Deleted successfully!")
    router.push(router.asPath)
  }

  return (
    <div
      className={[
        "modal modal-bottom sm:modal-middle",
        showDeleteItemModal ? "modal-open" : null
      ].join(" ")}
    >
      <div className="modal-box">
        <h3 className="mb-6 font-semibold text-2xl">Are you sure?</h3>

        <div className="modal-action">
          <button
            className="btn bg-white text-black hover:bg-white"
            onClick={() => toggleDeleteItemModal()}
          >
            Cancel
          </button>
          <button
            onClick={deleteItemHandler}
            className="btn bg-primary hover:bg-primary"
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
