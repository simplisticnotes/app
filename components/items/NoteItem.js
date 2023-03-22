import Image from "next/image"
import { useModalContext } from "../../context/ModalContext"
import ItemWrapper from "../ItemWrapper"

function NoteItem({
  note,
  disabled,
  canDelete = true,
  canShare = true,
  canRestore = false,
  canDeleteTrash = false
}) {
  const {
    toggleDeleteItemModal,
    toggleNoteShareModal,
    toggleRestoreNoteModal,
    toggleDeleteTrashModal
  } = useModalContext()

  return (
    <ItemWrapper
      disabled={disabled}
      href={`/app/notes/${note.id}`}
      onDelete={
        canDelete
          ? () => {
              toggleDeleteItemModal(note.id, "Note")
            }
          : null
      }
      onShare={
        canShare
          ? () => {
              toggleNoteShareModal(note.id)
            }
          : null
      }
      onRestore={
        canRestore
          ? () => {
              toggleRestoreNoteModal(note.id)
            }
          : null
      }
      onDeleteTrash={
        canDeleteTrash
          ? () => {
              toggleDeleteTrashModal(note.id)
            }
          : null
      }
    >
      <Image src="/note-item.svg" width={50} height={50} alt="Note Name" />
      <p className="font-medium text-lg text-center">{note.name}</p>
    </ItemWrapper>
  )
}

export default NoteItem
