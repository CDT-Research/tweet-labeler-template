import {createContext, useState, useEffect} from 'react'
import {useCollection} from '../hooks/useCollection'
import {projectFirestore} from '../firebase/config'
export const ActiveProjectContext = createContext()

export const ActiveProjectProvider = ({children}) => {
  const [activeProject, setActiveProject] = useState(null)
  const [archivedProjects, setArchivedProjects] = useState(null)

  useEffect(() => {
    console.log('reading')
    const unsub = projectFirestore.collection('projects').orderBy('createDate', 'desc').onSnapshot(snapshot => {
      let results = []
      console.log('subtriggered')
      snapshot.docs.forEach(doc => {
        results.push({...doc.data(), id: doc.id, createDate: doc.data().createDate.toDate().toDateString()})
      })
      if (results.length > 0){
        setActiveProject(results[0])
      }
      setArchivedProjects(results.slice(1,results.length))
    })
    return () => unsub()
  }, [])

  return(
    <ActiveProjectContext.Provider value={{activeProject, archivedProjects}}>
      {children}
    </ActiveProjectContext.Provider>
  )
}
