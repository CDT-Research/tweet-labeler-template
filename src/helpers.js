import {projectFirestore, timestamp} from './firebase/config'
import firebase from 'firebase/app'
import {nanoid} from 'nanoid'

const addFirestoreUsers = (projectname, userList) => {
  var batch = projectFirestore.batch()

  const projectid = nanoid(4)
  const projectRef = projectFirestore.collection('projects').doc(projectid)
  batch.set(projectRef, {name: projectname, users: userList, createDate: timestamp.fromDate(new Date())})

  for (let i = 0; i < userList.length; i++){
    let userOb = userList[i]
    let projectUserOb = {...userOb, batchesAssigned:0, batchesCompleted:0, currentBatch:null, currentProgress:0}
    let userRef = projectFirestore.collection('projects').doc(projectid).collection('projectusers').doc(projectUserOb.id)
    batch.set(userRef, projectUserOb)
  }

  return batch.commit()
}

const addFireBatches = (projectid, projectname, batchlist, autoDistribute, userIdList, uniquePairings, fileName) => {
  var batch = projectFirestore.batch()
  let numbatches = Math.min(batchlist.length, 150)
  for (let i = 0; i < numbatches; i++){
    const batchId = nanoid(8)
    const batchtoAdd = batchlist[i]
    const batchDataRef = projectFirestore.collection('projects').doc(projectid).collection('batchdata').doc(batchId)
    const batchInfoRef = projectFirestore.collection('projects').doc(projectid).collection('batchinfo').doc(batchId)
    if (autoDistribute > 0){
      let usersadding = {}
      for (let k = 0; k < userIdList.length; k++){
        usersadding[userIdList[k]] = 0
      }


      for (let j = 0; j < autoDistribute; j++){
        let addedUserIndex = uniquePairings ? 2*(i%(userIdList.length/2))+j : (i+j)%userIdList.length
        let userToGive = userIdList[addedUserIndex]
        usersadding[userToGive]++


        const userSubRef = projectFirestore.collection('users').doc(userToGive).collection(projectid).doc(batchId)
        batch.set(userSubRef, {batchStatus: 1, pointer:0, projectid: projectid, createdOn: timestamp.fromDate(new Date())})
      }
      userIdList.forEach(u => {
        let addednum = usersadding[u]
        const projUserRef = projectFirestore.collection('projects').doc(projectid).collection('projectusers').doc(u)
        batch.update(projUserRef, {batchesAssigned: firebase.firestore.FieldValue.increment(addednum)})
      })

    }

    batch.set(batchDataRef, {tweetArray: batchtoAdd, projectid: projectid})
    batch.set(batchInfoRef, {assignedTo: autoDistribute, completed: 0, projectname:projectname, projectid: projectid, createdOn: new Date().toDateString(), filename: fileName})
  }
  return batch.commit()
}

const splitIntoChunks = (arr, chunksize) => {
  const res = []
  while (arr.length > 0){
    const chunk = arr.splice(0,chunksize)
    res.push(chunk)
  }
  return res
}

//fisher-yates shuffle
const shuffle = (array) => {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

export {addFireBatches, addFirestoreUsers, shuffle, splitIntoChunks}
