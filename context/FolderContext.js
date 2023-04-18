import { createContext, useContext, useEffect, useState } from "react"

const FolderContext = createContext()

export const useFolderContext = () => useContext(FolderContext)

export const FolderContextProvider = ({
  children,
  folders: initialFolders
}) => {
  const [folders, setFolders] = useState(initialFolders || [])

  const addFolder = (folder) => {
    setFolders([folder, ...folders])
  }

  const deleteFolder = (id) => {
    setFolders(folders.filter((folder) => folder.id !== id))
  }

  const getRecentFolders = () => {
    return folders.slice(0, 5)
  }

  useEffect(() => {
    setFolders(initialFolders || [])
  }, [initialFolders])

  const data = {
    folders,
    addFolder,
    deleteFolder,
    getRecentFolders
  }

  return (
    <FolderContext.Provider value={data}>{children}</FolderContext.Provider>
  )
}
