import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import {useOutBatches} from '../hooks/useOutBatches'
import { DataGrid } from '@mui/x-data-grid';
import {useState} from 'react'
import {CSVLink} from 'react-csv'
import {useActiveContext} from '../hooks/useActiveContext'
const csvHeaders = [
  {label: "coder", key:"coder"},
  {label: "candidate", key:"username"},
  {label: "tweetId", key:"tweetId"},
  {label: "related", key: "isRelated"},
  {label: "stance", key: "stance"},
  {label: "narrative", key: "narrative"},
  {label: "identity", key:"idtype"},
  {label: "stereotypes", key:"stereotypes"},
  {label: "abuse", key: "abuse"},


  {label: "abusetypes", key:"abusetypes"},
  {label: "disinfo", key:"disinfo"},
  {label: "external", key:"external"},
  {label: "secondsTaken", key:"secondsTaken"},
  {label: "displayUrl", key:"displayUrl"}
]
const Export = () => {
  const {activeProject} = useActiveContext()
  const {documents, error} = useOutBatches(activeProject)

  const columns = [
    {field: 'userEmail', width:180, headerName: 'Labeler email'},
    {field: 'batchid', width:150, headerName: 'Batch id'},
    {field: 'finished', width:420, headerName: 'Completed on'}
  ]
  const [selectionModel, setSelectionModel] = useState([])



  const handleClick = () => console.log(documents)
  return(
    <Container component="main">
      <Box>
        <Typography>Finished Batches</Typography>
        <div style={{ height: 300, width: '100%' }}>

        {documents &&
          <DataGrid rows={documents}
            columns={columns}
            checkboxSelection
            onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
          console.log(newSelectionModel)
        }}
        selectionModel={selectionModel}/>
        }

        {error && <Typography color="error">{error}</Typography>}
        </div>
        {documents && <CSVLink headers={csvHeaders} data={documents.filter(doc => selectionModel.includes(doc.id)).map(doc => doc.labeledtweets).map(tweetarrs => removeDupes(tweetarrs)).flat().map(doc => !doc.displayUrl ? {...doc, displayUrl:`https://tweetmarker-4d5a9.web.app/tweetdisplay/${doc.tweetId}`} : doc)}>
          <Button variant="contained" color="secondary" style={{ height: '100%' }}>
                Download CSV
            </Button>
        </CSVLink>}
      </Box>
    </Container>

  )
}
export default Export

function removeDupes(tweetarr){
  return tweetarr.filter((item, index, self) => self.findIndex(t => t.tweetId === item.tweetId) === index)
}
