import {useState, useEffect} from 'react'
import Box from '@mui/material/Box'
import {useCollection} from '../hooks/useCollection'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import {useActiveContext} from '../hooks/useActiveContext'
import {UserGrid, BatchGrid} from '../components/StatusGrids'
const Dashboard = () => {
  const {activeProject} = useActiveContext()
  return (
    <div>
      {activeProject && <Box sx={{display: 'flex', flexDirection:'column'}}>
      <Typography variant="h3">{activeProject.name}</Typography>
      <BatchGrid projectid={activeProject.id}/>
      <UserGrid projectid={activeProject.id}/>
      </Box>}
    </div>
  )
}
export default Dashboard
