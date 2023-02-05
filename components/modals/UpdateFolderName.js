import React, { useState } from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import Spinner from "../Spinner"
import { useModalContext } from "../../context/ModalContext"
import { updateFolderName } from "../../core/folders"
import { toast } from "react-hot-toast"

function UpdateFolderName({ folderId, initialName, setFolder }) {
  const { showUpdateFolderNameModal, toggleUpdateFolderNameModal } =
    useModalContext()
  const [name, setName] = useState(initialName)
  const supabase = useSupabaseClient()
  const [loading, setLoading] = useState(false)

  const changeName = (e) => setName(e.target.value)

  const updateFolderHandler = async () => {
    if (!name.trim().length) {
      toast.error("Please enter the name!")
      return
    }

    setLoading(true)

    const { error } = await updateFolderName(supabase, folderId, name)

    if (error) {
      return toast.error(error.message)
    }

    setFolder((prevNote) => ({
      ...prevNote,
      name
    }))

    setLoading(false)

    toggleUpdateFolderNameModal()
  }

  return (
    <div
      className={[
        "modal modal-bottom sm:modal-middle",
        showUpdateFolderNameModal ? "modal-open" : null
      ].join(" ")}
    >
      <div className="modal-box">
        <h3 className="mb-6 font-semibold text-2xl">Update Folder Name</h3>

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
            onClick={toggleUpdateFolderNameModal}
          >
            Cancel
          </button>
          <button
            onClick={updateFolderHandler}
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

export default UpdateFolderName
