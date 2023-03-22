import React, { useEffect, useRef, useState } from "react"
import { useModalContext } from "../../context/ModalContext"
import { toast } from "react-hot-toast"

function NotePassword({ notePassword, showNote }) {
  const { showNotePasswordModal, toggleNotePasswordModal } = useModalContext()
  const inputRef = useRef(null)

  const [password, setPassword] = useState("")

  useEffect(() => {
    if (showNotePasswordModal) {
      inputRef.current.focus()
    }
  }, [showNotePasswordModal])

  const changePassword = (e) => setPassword(e.target.value)

  const reset = () => {
    setPassword("")
  }

  const closeModal = () => {
    reset()
    toggleNotePasswordModal()
  }

  const validateNotePassword = async () => {
    if (notePassword !== password) {
      return toast.error("Wrong password!")
    }

    closeModal()
    showNote()
  }

  return (
    <div
      className={[
        "modal modal-bottom sm:modal-middle",
        showNotePasswordModal ? "modal-open" : null
      ].join(" ")}
    >
      <div className="modal-box">
        <h3 className="mb-6 font-semibold text-2xl">Enter Note's Password</h3>

        <div className="flex flex-col text-xl gap-2">
          <input
            placeholder="Password..."
            className="outline-none border-b-2 border-black"
            value={password}
            onChange={changePassword}
            ref={inputRef}
          />
        </div>

        <div className="modal-action">
          <button onClick={validateNotePassword} className="btn btn-primary">
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotePassword
