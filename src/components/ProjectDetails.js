import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import {useState, useEffect} from 'react'
import {useOutBatches} from '../hooks/useOutBatches'
import {UserGrid} from './StatusGrids'
import {CSVLink} from 'react-csv'
import {csvHeaders} from '../assets/csvheaders'


const ProjectDetails = ({project}) => {
  const {documents, error} = useOutBatches(project)

  return(
    <Box>
      <UserGrid projectid={project.id} />
        {documents && <CSVLink headers={csvHeaders} filename={`${project.name}_LabeledTweets.csv`} data={documents.map(doc => doc.labeledtweets).map(tweetarrs => removeDupes(tweetarrs)).flat().map(doc => !doc.displayUrl ? {...doc, displayUrl:`https://tweetmarker-4d5a9.web.app/tweetdisplay/${doc.tweetId}`} : doc)}>
          <Button variant="contained" color="secondary" style={{ height: '100%' }}>
                Download CSV
            </Button>
        </CSVLink>}

    </Box>
  )
}
export default ProjectDetails

function removeDupes(tweetarr){
  return tweetarr.filter((item, index, self) => self.findIndex(t => t.tweetId === item.tweetId) === index)
}
