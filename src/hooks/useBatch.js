import {useState, useEffect} from 'react'
import {projectFirestore, timestamp} from '../firebase/config'
import firebase from 'firebase/app'

export const useBatch = () => {
  const [currentTweet, setCurrentTweet] = useState(null)
  const [tweetList, setTweetList] = useState(null)
  const [listPointer, setListPointer] = useState(null)
  const [batchError, setBatchError] = useState(null)
  const [batchPending, setBatchPending] = useState(false)
  const [batchOver, setBatchOver] = useState(false)

  useEffect(() => {
    if (tweetList && listPointer != null){
      let newtweet = tweetList[listPointer]
      setCurrentTweet({...newtweet})
    }
  }, [tweetList, listPointer, setTweetList])
  const addLabel = async (projectid, useremail, userid, batchid, tweetno, tweetid, tweetlabel, loadtoggle) => {
    try{
      await projectFirestore.collection('projects').doc(projectid).collection('outbatches').doc(batchid+userid).set({projectid:projectid, userEmail: useremail, labeledtweets: firebase.firestore.FieldValue.arrayUnion(tweetlabel)}, {merge:true})
      let updates = {}
      let nextpointer = tweetno+1
      let batchending = false
      let projupdates = {}
      projupdates['currentProgress'] = tweetno+1
      projupdates['currentBatch'] = batchid
      updates['pointer'] = tweetno+1
      updates['batchStatus'] = 2
      if (tweetno+1 >= tweetList.length){
        updates['batchStatus'] = 0
        projupdates['batchesCompleted'] = firebase.firestore.FieldValue.increment(1)
        projupdates['currentProgress'] = 0
        projupdates['currentBatch'] = null
        nextpointer = null
        batchending = true
        const finished = timestamp.fromDate(new Date())
        await projectFirestore.collection('projects').doc(projectid).collection('outbatches').doc(batchid+userid).update({finished})
        await projectFirestore.collection('projects').doc(projectid).collection('batchinfo').doc(batchid).update({completed:firebase.firestore.FieldValue.increment(1)})
      }
      await projectFirestore.collection('projects').doc(projectid).collection('projectusers').doc(userid).update(projupdates)
      await projectFirestore.collection('users').doc(userid).collection(projectid).doc(batchid).update(updates)
      setListPointer(nextpointer)
      setBatchOver(batchending)
      setCurrentTweet(tweetList[nextpointer])
    }
    catch(err){
      setBatchError(err.message)
    }
    }
  const getBatch = async (batchdoc, userid) => {
    setBatchError(null)
    setBatchPending(true)
    try{
      const fetchedTweets = await projectFirestore.collection('projects').doc(batchdoc.projectid).collection('batchdata').doc(batchdoc.id).get()
      if (!fetchedTweets.exists){
        throw new Error("no document!")
      }
      if (batchdoc.batchStatus == 1){
        await projectFirestore.collection('users').doc(userid).update({lastStarted: new Date().toDateString()})
        await projectFirestore.collection('users').doc(userid).collection(batchdoc.projectid).doc(batchdoc.id).update({batchStatus: 2})
      }
      setTweetList(fetchedTweets.data().tweetArray)
      setListPointer(batchdoc.pointer)
      setBatchPending(false)
    }
    catch(err){
      setBatchPending(false)
      setBatchError(err.message)
    }
  }
  return {currentTweet, addLabel, getBatch, listPointer, batchError, batchPending, tweetList, batchOver}
}
