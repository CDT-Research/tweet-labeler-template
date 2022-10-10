import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Paper from '@mui/material/Paper'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {useCollection} from '../hooks/useCollection'
import {useState, useEffect} from 'react'
import {useNewProject} from '../hooks/useNewProject'
import {useActiveContext} from '../hooks/useActiveContext'

const NewProject = () => {
  const [projectName, setProjectName] = useState('')
  const [pickedUsers, setPickedUsers] = useState([])
  const {documents, error} = useCollection('users')
  const {pendingMessage, errMessage, isPending, createProject} = useNewProject()

  const handleSubmit = (e) => {
    e.preventDefault()
    const userlist = documents.filter(usr => pickedUsers.includes(usr.id))
    createProject(projectName, userlist)
  }
  const handleAddUser = (userid) => {
    setPickedUsers((oldlist) => [...oldlist, userid])
  }
  const handleRemoveUser = (userid) => {
    setPickedUsers((oldlist) => oldlist.filter(usr => usr != userid))
  }
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        >
        <Typography component="h1" variant="h5">
          Create Project
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="projectname"
            label="Project Name"
            name="projectname"
            autoComplete="off"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            autoFocus
            />
          <Box sx={{display:'flex'}}>
            <Paper sx={{ width: 300, height: 530, overflow: 'auto' }}>
              <List>
                {documents && documents.filter(usr => (!pickedUsers.includes(usr.id) && !usr.admin)).map(usr => (
                  <ListItem key={usr.id}>
                    <ListItemButton onClick={() => handleAddUser(usr.id)}>
                      <ListItemIcon><AddIcon /></ListItemIcon>
                      <ListItemText primary={usr.displayName} secondary={usr.email}/>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Paper>
            <Paper sx={{ width: 300, height: 530, overflow: 'auto' }}>
              <List>
                {documents && documents.filter(usr => pickedUsers.includes(usr.id)).map(usr => (
                  <ListItem key={usr.id}>
                    <ListItemButton onClick={() => handleRemoveUser(usr.id)}>
                      <ListItemIcon><RemoveCircleIcon /></ListItemIcon>
                      <ListItemText primary={usr.displayName} secondary={usr.email}/>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Box>
          {!isPending && <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            >submit</Button>}
            {isPending && <Button
              type="submit"
              disabled
              fullWidth
              color={pendingMessage && pendingMessage == "done!" ? "success" : "primary"}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              >
              {pendingMessage}
            </Button>}
            {errMessage && <Typography component="h1" variant="h5">
              {errMessage}
            </Typography>}
          </Box>
        </Box>
      </Container>
    )
  }
  export default NewProject
