import { createContext, useContext, useState } from "react"

const ModalContext = createContext()

export const useModalContext = () => useContext(ModalContext)

export const ModalContextProvider = ({ children }) => {
  const [showCreateNoteModal, setShowCreateNoteModal] = useState(false)
  const [showUpdateNoteNameModal, setShowUpdateNoteNameModal] = useState(false)

  const toggleCreateNoteModal = () => {
    setShowCreateNoteModal((prev) => !prev)
  }

  const toggleUpdateNoteNameModal = () => {
    setShowUpdateNoteNameModal((prev) => !prev)
  }

  const value = {
    showCreateNoteModal,
    toggleCreateNoteModal,
    showUpdateNoteNameModal,
    toggleUpdateNoteNameModal
  }

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}
