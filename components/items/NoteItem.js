import Image from "next/image"
import React from "react"
import { useModalContext } from "../../context/ModalContext"
import ItemWrapper from "../ItemWrapper"
import { deleteNote } from "../../core/notes"

function NoteItem({ note }) {
  const { toggleDeleteItemModal } = useModalContext()

  return (
    <ItemWrapper
      href={`/app/notes/${note.id}`}
      onDelete={() => {
        toggleDeleteItemModal(note.id, "Note")
      }}
    >
      <Image src="/note-item.svg" width={50} height={50} alt="Note Name" />
      <p className="font-medium text-lg text-center">{note.name}</p>
    </ItemWrapper>
  )
}

export default NoteItem
