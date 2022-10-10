import {useProjectCollection} from '../hooks/useProjectCollection'
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export const UserGrid = ({projectid}) => {
  const {documents, error} = useProjectCollection(projectid, 'projectusers')


  const columns = [
    {field: 'displayName', headerName: 'Name', width:140},
    {field: 'email', headerName: "Email", width:160},
    {field: 'currentBatch', headerName: 'Current Batch', width:140},
    {field: 'currentProgress', headerName: 'Batch Progress', width:140},
    {field: 'batchesCompleted', headerName: 'Batches Completed', width:140},
    {field: 'batchesAssigned', headerName: 'Batches Assigned', width:140}
  ]

  return(
    <Box sx={{mt:4, display:'flex',flexDirection:'column'}}>
      <Typography variant="h5">Users</Typography>


    <div style={{ height: 300, width: '100%' }}>
      {documents && <DataGrid rows={documents} columns={columns} />}
      {!documents && <p>No data here</p>}

    </div>
    </Box>
  )
}

export const BatchGrid = ({projectid}) => {
  const {documents, error} = useProjectCollection(projectid, 'batchinfo')

  const columns = [
    {field: 'id', headerName: 'Batch Id', width:140},
    {field: 'completed', headerName: 'Users Completed', width:140},
    {field: 'assignedTo', headerName: 'Users Assigned', width:140},
    {field: 'createdOn', headerName: "Date Uploaded", width:140},
    {field: 'filename', headerName: "File Name", width:140}
  ]
  return(
    <Box sx={{mt:4, display:'flex',flexDirection:'column'}}>

    <Typography variant="h5">Batches</Typography>

    <div style={{ height: 300, width: '100%' }}>
      {documents && <DataGrid rows={documents} columns={columns} />}
      {!documents && <p>No data here</p>}

    </div>
    </Box>
  )
}
