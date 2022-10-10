import {useState, useEffect} from 'react'
import {projectStorage} from '../firebase/config'
import {addUsers, addFirestoreUsers} from '../helpers'

export const useNewProject = () => {
  const [pendingMessage, setPendingMessage] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [errMessage, setErrMessage] = useState(null)
  const createProject = async (projectName, userlist) => {

    setPendingMessage("initializing")
    setErrMessage(null)

    try{
      setIsPending(true)
      setPendingMessage("adding users...")

      await addFirestoreUsers(projectName, userlist)
      setPendingMessage("done!")
    }
    catch (err){
      setIsPending(false)
      setErrMessage(err.message)
    }
  }
  return {isPending, pendingMessage, errMessage, createProject}
}
