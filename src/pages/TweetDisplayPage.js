import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import {useParams} from 'react-router-dom'
import {TwitterTweetEmbed} from 'react-twitter-embed'

const TweetDisplayPage = () => {
  const {tweetid} = useParams()
  
  return(
    <Container>
      <TwitterTweetEmbed tweetId={tweetid} />
    </Container>
  )
}
export default TweetDisplayPage
