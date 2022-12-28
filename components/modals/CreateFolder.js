import React, { useState } from "react"
import { NotificationManager } from "react-notifications"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { useRouter } from "next/router"
import { createFolder } from "../../core/folders"
import Spinner from "../Spinner"
import { useModalContext } from "../../context/ModalContext"

function CreateFolder() {
  const { showCreateFolderModal, toggleCreateFolderModal } = useModalContext()
  const [name, setName] = useState("Untitled")
  const supabase = useSupabaseClient()
  const user = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const changeName = (e) => setName(e.target.value)

  const createFolderHandler = async () => {
    if (!name.trim().length) {
      return NotificationManager.error("Please enter the name!")
    }

    setLoading(true)

    const { error } = await createFolder(supabase, {
      name,
      user_id: user.id
    })

    if (error) {
      return NotificationManager.error(error.message)
    }

    setLoading(false)

    toggleCreateFolderModal()
    router.push("/app/folders")
  }

  return (
    <div
      className={[
        "modal modal-bottom sm:modal-middle",
        showCreateFolderModal ? "modal-open" : null
      ].join(" ")}
    >
      <div className="modal-box">
        <h3 className="mb-6 font-semibold text-2xl">Create Folder</h3>

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
            onClick={toggleCreateFolderModal}
          >
            Cancel
          </button>
          <button
            onClick={createFolderHandler}
            className="btn bg-primary hover:bg-primary"
            disabled={loading}
          >
            Confirm
            {loading && <Spinner />}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateFolder
