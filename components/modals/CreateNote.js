import React, { useState } from "react"
import { NOTE_TYPES } from "../../constants/notes"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { useRouter } from "next/router"
import { createNote } from "../../core/notes"
import Spinner from "../Spinner"
import { useModalContext } from "../../context/ModalContext"
import { toast } from "react-hot-toast"

function CreateNote() {
  const { showCreateNoteModal, toggleCreateNoteModal } = useModalContext()
  const [name, setName] = useState("Untitled")
  const [type, setType] = useState(NOTE_TYPES[0])
  const [applyPassword, setApplyPassword] = useState(false)
  const [password, setPassword] = useState("")
  const supabase = useSupabaseClient()
  const user = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const changeName = (e) => setName(e.target.value)
  const changeType = (e) => setType(e.target.value)
  const changeApplyPassword = () => setApplyPassword(!applyPassword)
  const changePassword = (e) => setPassword(e.target.value)

  const reset = () => {
    setName("Untitled")
    setType(NOTE_TYPES[0])
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

    const { error } = await createNote(supabase, {
      name,
      type,
      user_id: user.id,
      apply_password: applyPassword,
      password
    })

    if (error) {
      return toast.error(error.message)
    }

    setLoading(false)

    closeModal()

    toast.success("Note created successfully!")
    router.push(router.asPath)
  }

  return (
    <div
      className={[
        "modal modal-bottom sm:modal-middle",
        showCreateNoteModal ? "modal-open" : null
      ].join(" ")}
    >
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
            {NOTE_TYPES.map((noteType, i) => (
              <option value={noteType} key={i}>
                {noteType}
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
          <button
            className="btn bg-white text-black hover:bg-white"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            onClick={createNoteHandler}
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

export default CreateNote
