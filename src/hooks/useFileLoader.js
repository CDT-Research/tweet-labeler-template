import {useState, useEffect} from 'react'
import {projectStorage} from '../firebase/config'
import {shuffle, splitIntoChunks, addFireBatches} from '../helpers'

//poorly named helper function that turns a json file
async function fileToJSON(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onload = event => resolve(JSON.parse(event.target.result))
    fileReader.onerror = error => reject(error)
    fileReader.readAsText(file)
  })
}
export const useFileLoader = () => {
  const [pendingMessage, setPendingMessage] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [errMess, setErrMess] = useState(null)

  //pipeline that turns an upload file into distributed batches
  const makeBatches = async (projectid, projectname, uploadFile, batchsize, autoDistribute, userIdList, uniquePairings) => {
    //set starting message, get rid of old error if there is one
    setPendingMessage("initializing")
    setErrMess(null)

    try{
      setIsPending(true)
      setPendingMessage("fetching data")
      const dataList = await fileToJSON(uploadFile)



      setPendingMessage("creating batches")
      const dataBatches = await splitIntoChunks(dataList, batchsize)
      setPendingMessage('adding batches')
      const updateObject = await addFireBatches(projectid, projectname, dataBatches, autoDistribute, userIdList, uniquePairings, uploadFile.name)
      setPendingMessage("Done!")




    }
    catch (err){
      setIsPending(false)
      setErrMess(err.message)
    }
  }

  return {errMess, pendingMessage, isPending, makeBatches}
}
