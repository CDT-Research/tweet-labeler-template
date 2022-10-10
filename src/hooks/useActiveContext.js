import {ActiveProjectContext} from '../context/ActiveProject'
import {useContext} from 'react'
//custom context hook for active project
export const useActiveContext = () => {
  const context = useContext(ActiveProjectContext)

  if (!context){
    throw new Error("context used outside of hook")
  }

  return context
}
