import {useState, useEffect} from 'react'
import {projectFirestore} from '../firebase/config'
import {useActiveContext} from './useActiveContext'

export const useUserPage = (userid) => {

  const {activeProject} = useActiveContext()
  const [pageLoading, setPageLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pageMessage, setPageMessage] = useState(null)
  //list of batches assigned and progress (not actual data)
  const [batchesAssigned, setBatchesAssigned] = useState([])
  //next batch, either continuing or starting a new one
  const [batchToLoad, setBatchToLoad] = useState(null)

  useEffect(() => {
    console.log("batchToLoad:", batchToLoad)
    if (batchToLoad == null){
      return
    }
    if (batchToLoad.length == 0){
      setPageMessage("nonemessage")
      return
    }
    if (batchToLoad[0].batchStatus == 2){
      setPageMessage("continuemessage")
      return
    }
    if (batchToLoad[0].batchStatus == 1){
      projectFirestore.collection('users').doc(userid).get()
        .then(doc => {
          if (doc.exists){
            let newmessage = (doc.data().lastStarted && doc.data().lastStarted == new Date().toDateString()) ? "batchlimit" : "startmessage"
            setPageMessage(newmessage)
          }
        })
        .catch(err => {
          setError(err.message)
        })
      return
    }
  }, [batchToLoad, pageLoading])
  useEffect(() => {
    if (!activeProject){
      return
    }
    if (pageLoading){
      setBatchToLoad(null)
    projectFirestore.collection('users').doc(userid).collection(activeProject.id).where("batchStatus", ">", 0).orderBy("batchStatus", "desc").limit(1)
      .get()
      .then(batchSnapshot => {
        let results = []
        batchSnapshot.forEach(doc => {
          console.log(doc.data())
          results.push({...doc.data(), id: doc.id})
        })
        setBatchToLoad(results)
        setPageLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setPageLoading(false)
      })
    }
  }, [pageLoading, activeProject])

  const loadtoggle = () => {
    setPageLoading(true)
  }
  return {pageLoading, pageMessage, batchToLoad, error, loadtoggle}
}
