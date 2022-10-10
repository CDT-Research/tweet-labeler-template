import {AuthContext} from '../context/AuthContext'
import {useContext} from 'react'
//custom context hook for authentication context
export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (!context){
    throw new Error("context used outside of hook")
  }

  return context
}
