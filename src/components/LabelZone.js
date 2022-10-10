import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import {TwitterTweetEmbed} from 'react-twitter-embed'

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import FormArea from './FormArea'
import {useBatch} from '../hooks/useBatch'
import {useState, useEffect} from 'react'
const LabelZone = ({currentTweet, getNext, usermail}) => {





  useEffect(() => {
    console.log('initial zone render')
    console.log(currentTweet)
  }, [])

  useEffect(() => {
    console.log(currentTweet)


    console.log('per tweet render')
  }, [currentTweet])

  return(
    <Stack
  direction="row"
  divider={<Divider orientation="vertical" flexItem />}
  spacing={2}
>
<Box sx={{width:900}}>
  <TwitterTweetEmbed tweetId={currentTweet.id} />
  <Typography>tweet id: {currentTweet.id}</Typography>

    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        >
        <Typography>Raw Text</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          {currentTweet.text}

        </Typography>
      </AccordionDetails>
    </Accordion>

</Box>

  <FormArea getNext={getNext} currentTweet={currentTweet} usermail={usermail}/>

</Stack>


  )
}

export default LabelZone
