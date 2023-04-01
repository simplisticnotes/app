import React, { useEffect, useState } from "react"
import { getNoteTypes } from "../../constants/notes"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { useRouter } from "next/router"
import { createNote } from "../../core/notes"
import Spinner from "../Spinner"
import { useModalContext } from "../../context/ModalContext"
import { toast } from "react-hot-toast"
import { usePricingContext } from "../../context/PricingContext"
import { refreshPage } from "../../utils"
import { getFolders } from "../../core/folders"

function CreateNote({ folderId = null }) {
  const pricingData = usePricingContext()
  const { showCreateNoteModal, toggleCreateNoteModal, createNoteFolderId } =
    useModalContext()

  const [name, setName] = useState("Untitled")
  const [type, setType] = useState(getNoteTypes(pricingData.getUserPlan())[0])
  const [applyPassword, setApplyPassword] = useState(false)
  const [password, setPassword] = useState("")
  const [folders, setFolders] = useState([])
  const [folder, setFolder] = useState(createNoteFolderId)

  const [loading, setLoading] = useState(false)
  const [foldersLoading, setFoldersLoading] = useState(false)

  const supabase = useSupabaseClient()
  const user = useUser()
  const router = useRouter()

  const getFoldersHandler = async () => {
    setFoldersLoading(true)

    const { data } = await getFolders(supabase)
    console.log(data)
    setFolders(data)

    setFoldersLoading(false)

    // TODO: ERROR HANDLING
  }

  useEffect(() => {
    if (showCreateNoteModal) getFoldersHandler()
  }, [showCreateNoteModal])

  useEffect(() => {
    setFolder(createNoteFolderId)
  }, [createNoteFolderId])

  const changeName = (e) => setName(e.target.value)
  const changeType = (e) => setType(e.target.value)
  const changeFolder = (e) => setFolder(e.target.value)
  const changeApplyPassword = () => setApplyPassword(!applyPassword)
  const changePassword = (e) => setPassword(e.target.value)

  const reset = () => {
    setName("Untitled")
    setType(getNoteTypes(pricingData.getUserPlan())[0])
    setApplyPassword(false)
    setPassword("")
    setLoading(false)
  }

  const closeModal = () => {
    reset()
    toggleCreateNoteModal()
  }

  const createNoteHandler = async () => {
    if (!name.trim().length) {
      toast.error("Please enter the name!")
      return
    }

    if (applyPassword && !password.trim().length) {
      toast.error("Please enter the password!")
      return
    }

    setLoading(true)

    const note = {
      name,
      type,
      user_id: user.id,
      apply_password: applyPassword,
      password
    }

    if (folder) {
      note.folder_id = folder
    }

    const { error } = await createNote(supabase, note)

    if (error) {
      return toast.error(error.message)
    }

    setLoading(false)

    closeModal()

    toast.success("Note created successfully!")
    refreshPage(router)
  }

  return (
    <div
      className={[
        "modal modal-bottom sm:modal-middle",
        showCreateNoteModal ? "modal-open" : null
      ].join(" ")}
    >
      {foldersLoading ? (
        <div className="modal-box h-48 flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="modal-box">
          <h3 className="mb-6 font-semibold text-2xl">Create Note</h3>

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

          <div className="flex flex-col text-xl gap-2 mt-8">
            <label htmlFor="note-name">Type</label>

            <select
              className="select select-bordered text-xl"
              value={type}
              onChange={changeType}
            >
              {getNoteTypes(pricingData.getUserPlan()).map((noteType, i) => (
                <option value={noteType} key={noteType}>
                  {noteType}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col text-xl gap-2 mt-8">
            <label htmlFor="note-name">Folder</label>

            <select
              className="select select-bordered text-xl"
              value={folder}
              onChange={changeFolder}
            >
              {[{ id: null, name: "No Folder" }, ...folders].map((folder) => (
                <option value={folder.id} key={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex text-xl gap-2 mt-8">
            <input
              type="checkbox"
              checked={applyPassword}
              onChange={changeApplyPassword}
              className="checkbox checkbox-primary"
              id="note-apply-password"
            />
            <label htmlFor="note-apply-password">Apply Password</label>
          </div>

          {applyPassword && (
            <div className="flex flex-col text-xl gap-2 mt-8">
              <label htmlFor="note-password">Password</label>
              <input
                // type="password"
                value={password}
                onChange={changePassword}
                id="note-password"
                placeholder="Password of the note..."
                className="outline-none border-b-2 border-black"
              />
            </div>
          )}

          <div className="modal-action">
            <button className="btn btn-outline" onClick={closeModal}>
              Cancel
            </button>
            <button
              onClick={createNoteHandler}
              className="btn btn-primary"
              disabled={loading}
            >
              Confirm
              {loading && <Spinner />}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CreateNote
