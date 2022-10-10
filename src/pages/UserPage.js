import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import {useState, useEffect} from 'react'
import {useUserPage} from '../hooks/useUserPage'
import {useBatch} from '../hooks/useBatch'
import LabelZone from '../components/LabelZone/LabelZone'
import {useActiveContext} from '../hooks/useActiveContext'
const UserPage = ({userid, usermail}) => {

  const {pageLoading, pageMessage, batchToLoad, error, loadtoggle} = useUserPage(userid)
  const {currentTweet, addLabel, getBatch, listPointer, batchError, batchPending, tweetList, batchOver} = useBatch()

  const handleClick = () => {
    if (batchToLoad && batchToLoad[0]){
      getBatch(batchToLoad[0], userid)

    }

  }
  const getNext = (tweetlabel) => {
    addLabel(batchToLoad[0].projectid, usermail, userid, batchToLoad[0].id, listPointer, currentTweet.id, tweetlabel, loadtoggle)
  }
  useEffect(() => {
    if (batchOver){
      loadtoggle()
    }
  }, [batchOver])




  return(
    <Container component="main">

      <Box>
        {pageLoading && <Typography>Loading...</Typography>}
        {error && <Typography color="error">{error}</Typography>}
      </Box>
      {tweetList && currentTweet && tweetList.filter(t => t.id == currentTweet.id).map((t, i) => (
        <Box key={t.id}>
          <Typography variant="h6" align="left">Batch Id: {batchToLoad[0].id} {listPointer}/{tweetList.length} tweets labeled</Typography>
          <LabelZone currentTweet={t} getNext={getNext} usermail={usermail}/>
        </Box>

      ))}
      {!currentTweet && <Box>

        {pageMessage == "nonemessage" && <Typography>No batches to load!</Typography>}
        {pageMessage == "continuemessage" && <Box>
          <Typography>
            You are in the middle of a batch.
          </Typography>
          {!batchPending && <Button onClick={handleClick} variant="contained">Continue batch</Button>}
          {batchPending && <Button onClick={handleClick} disabled variant="contained">Loading</Button>}
        </Box>}

        {pageMessage == "startmessage" && <Box>
          <Typography>
            You've got a batch to label!
          </Typography>
          {!batchPending && <Button onClick={handleClick} variant="contained">Start batch</Button>}
          {batchPending && <Button onClick={handleClick} disabled variant="contained">Loading</Button>}
        </Box>}
      {pageMessage == "batchlimit" && <Typography variant="h4">You've already labeled a batch today!</Typography>}


      </Box>}
      {batchError && <Typography color="error">{batchError}</Typography>}
    </Container>
  )
}

export default UserPage
