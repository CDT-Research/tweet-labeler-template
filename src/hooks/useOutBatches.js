import {useEffect, useState} from 'react'
import {projectFirestore } from "../firebase/config"
export const useOutBatches = (project) => {

  const [documents, setDocuments] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!project){
      return
    }
    let ref = projectFirestore.collection('projects').doc(project.id).collection('outbatches').orderBy("finished")
    const unsubscribe = ref.onSnapshot(snapshot => {
      let results = []
      snapshot.docs.forEach(doc => {
        results.push({...doc.data(), userid:doc.id.slice(8,doc.id.length), batchid:doc.id.slice(0,8), id: doc.id, finished: doc.data().finished.toDate()})
      });
      // update state
      setDocuments(results)
      setError(null)
    }, error => {
      console.log(error)
      setError('could not fetch the data')
    })
    // unsubscribe on unmount
    return () => unsubscribe()
  }, [project])
  return {documents, error}
}
