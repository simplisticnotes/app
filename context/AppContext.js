import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const [showCreateNoteModal, setShowCreateNoteModal] = useState(false);

  const value = {
    showCreateNoteModal,
    setShowCreateNoteModal,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
