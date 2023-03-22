import { createContext, useContext, useState } from "react"

const ModalContext = createContext()

export const useModalContext = () => useContext(ModalContext)

export const ModalContextProvider = ({ children }) => {
  const [showCreateNoteModal, setShowCreateNoteModal] = useState(false)
  const [showDeleteItemModal, setShowDeleteItemModal] = useState(false)
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false)
  const [showUpdateNoteNameModal, setShowUpdateNoteNameModal] = useState(false)
  const [showUpdateFolderNameModal, setShowUpdateFolderNameModal] =
    useState(false)
  const [showNotePasswordModal, setShowNotePasswordModal] = useState(false)
  const [showNoteShareModal, setShowNoteShareModal] = useState(false)
  const [showRestoreNoteModal, setShowRestoreNoteModal] = useState(false)
  const [showDeleteTrashModal, setShowDeleteTrashModal] = useState(false)

  const [deleteItemId, setDeleteItemId] = useState(null)
  const [deleteType, setDeleteType] = useState(null)
  const [shareNoteId, setShareNoteId] = useState(null)
  const [restoreNoteId, setRestoreNoteId] = useState(null)
  const [deleteTrashId, setDeleteTrashId] = useState(null)

  const toggleCreateNoteModal = () => {
    setShowCreateNoteModal((prev) => !prev)
  }

  const toggleDeleteItemModal = (itemId, type) => {
    setShowDeleteItemModal((prev) => !prev)
    setDeleteItemId(itemId)
    setDeleteType(type)
  }

  const toggleCreateFolderModal = () => {
    setShowCreateFolderModal((prev) => !prev)
  }

  const toggleUpdateNoteNameModal = () => {
    setShowUpdateNoteNameModal((prev) => !prev)
  }

  const toggleUpdateFolderNameModal = () => {
    setShowUpdateFolderNameModal((prev) => !prev)
  }

  const toggleNotePasswordModal = () => {
    setShowNotePasswordModal(!showNotePasswordModal)
  }

  const toggleNoteShareModal = (noteId) => {
    setShareNoteId(noteId)
    setShowNoteShareModal(!showNoteShareModal)
  }

  const toggleRestoreNoteModal = (noteId) => {
    setRestoreNoteId(noteId)
    setShowRestoreNoteModal(!showRestoreNoteModal)
  }

  const toggleDeleteTrashModal = (noteId) => {
    setDeleteTrashId(noteId)
    setShowDeleteTrashModal(!showDeleteTrashModal)
  }

  const value = {
    showCreateNoteModal,
    toggleCreateNoteModal,
    showUpdateNoteNameModal,
    toggleUpdateNoteNameModal,
    showCreateFolderModal,
    toggleCreateFolderModal,
    showDeleteItemModal,
    toggleDeleteItemModal,
    deleteItemId,
    deleteType,
    showNotePasswordModal,
    toggleNotePasswordModal,
    showUpdateFolderNameModal,
    toggleUpdateFolderNameModal,
    showNoteShareModal,
    toggleNoteShareModal,
    shareNoteId,
    showRestoreNoteModal,
    toggleRestoreNoteModal,
    restoreNoteId,
    showDeleteTrashModal,
    toggleDeleteTrashModal,
    deleteTrashId
  }

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}
