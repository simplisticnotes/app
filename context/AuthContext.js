import { createContext, useContext } from "react"

const AuthContext = createContext()

export const useAppContext = useContext(AuthContext)

export const AuthContextProvider = ({ children }) => {
  const value = {}

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
