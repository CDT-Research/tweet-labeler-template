import React, { useState, useEffect } from "react";
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import FormGroup from '@mui/material/FormGroup'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Typography from '@mui/material/Typography'
import {useFileLoader} from '../hooks/useFileLoader'
import CancelIcon from '@mui/icons-material/Cancel';
import {useActiveContext} from '../hooks/useActiveContext'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
const FileLoader = () => {

  const {activeProject} = useActiveContext()


  const [file, setFile] = useState(null)
  const [batchSize, setBatchSize] = useState(250)
  const [autoAssign, setAutoAssign] = useState(2)
  const [uniquePairings, setUniquePairings] = useState(true)


  const {errMess, pendingMessage, isPending, makeBatches} = useFileLoader()

  const handleUpload = (e) => {
    if (!e.target.files){
      return
    }
    setFile(e.target.files[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let idListSubmitted = activeProject.users.map(d => d.id)
    makeBatches(activeProject.id, activeProject.name, file, batchSize, autoAssign, idListSubmitted, uniquePairings)

  }
  const removeFile = () => setFile(null)

  const handleAssign = (val) => {
    if (val != 2){
      setUniquePairings(false)
    }
    setAutoAssign(val)
  }


  return(
    <Container component="main" maxWidth="md">
      {!activeProject && <Typography>No active projects!</Typography>}
      {activeProject && <>
      <Typography>Add data</Typography>
    <Box component="form" onSubmit={handleSubmit} sx={{display:'flex', flexDirection:'column'}}>
      <Box sx={{display:'flex', justifyContent: 'space-between', mt: 3, mb: 2 }}>

        {!file &&
          <Button
            startIcon={<UploadFileIcon/>}
  variant="outlined"
  component="label"
>
  Choose File
  <input
    type="file"
    hidden
    onChange={handleUpload}
  />
</Button>

  }
  {file && <Button variant="outlined" startIcon={<CancelIcon/>} component="label" onClick={removeFile}>{file.name}</Button>}


<TextField label="Batch Size" required value={batchSize} onChange={(e) => setBatchSize(e.target.value)} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
<TextField label="Auto-assign to users" value={autoAssign} onChange={(e) => handleAssign(e.target.value)} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
  <FormGroup>
    <FormControlLabel control={<Switch checked={uniquePairings} onChange={(e) => setUniquePairings(e.target.checked)} disabled={autoAssign != 2} />} labelPlacement="top" label="Unique user pairings" />
  </FormGroup>
</Box>

  {!isPending && <Button
    type="submit"
    fullWidth
    variant="contained"
    sx={{ mt: 3, mb: 2 }}
  >Upload</Button>}
  {isPending && <Button
    type="submit"
    disabled
    fullWidth
    variant="contained"
    sx={{ mt: 3, mb: 2 }}
  >
    {pendingMessage}
  </Button>}
  {errMess && <Typography component="h1" variant="h5">
    {errMess}
  </Typography>}

    </Box>
    </>}
    </Container>
  )
}
export default FileLoader
