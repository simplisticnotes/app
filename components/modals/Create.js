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

function Create() {
  const {
    showCreateModal,
    toggleCreateModal,
    toggleCreateNoteModal,
    toggleCreateFolderModal
  } = useModalContext()

  return (
    <div
      className={[
        "modal modal-bottom sm:modal-middle",
        showCreateModal ? "modal-open" : null
      ].join(" ")}
    >
      <div className="modal-box">
        <h3 className="mb-6 font-semibold text-2xl">
          What do you want to create?
        </h3>

        <div className="flex items-center gap-4">
          <button
            className="btn btn-primary"
            onClick={() => {
              toggleCreateModal()
              toggleCreateNoteModal()
            }}
          >
            Note
          </button>
          <button
            className="btn"
            onClick={() => {
              toggleCreateModal()
              toggleCreateFolderModal()
            }}
          >
            Folder
          </button>
        </div>

        <div className="modal-action">
          <button className="btn btn-outline" onClick={toggleCreateModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default Create
