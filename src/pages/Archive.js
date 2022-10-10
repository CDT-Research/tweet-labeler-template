import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import ProjectDetails from '../../components/ProjectDetails/ProjectDetails'
import {useState, useEffect} from 'react'
import {useActiveContext} from '../../hooks/useActiveContext'

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
export const Archive = () => {

  const {archivedProjects} = useActiveContext()

  return(
    <Container component="main">
      {!archivedProjects && <Typography>Loading...</Typography>}

      {archivedProjects && <Box>
        <Typography variant="h5">Project Archive</Typography>
        {archivedProjects.filter(p => !p.hidden).map(proj => (
          <Accordion key={proj.id} elevation={4} sx={{mt:2}} TransitionProps={{ unmountOnExit: true }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography sx={{width:'30%', flexShrink: 0}}>{proj.name}</Typography>
              <Typography align="right" sx={{width:'60%'}}>{proj.createDate}</Typography>
            </AccordionSummary>
          <AccordionDetails>
            <ProjectDetails project={proj} />
          </AccordionDetails>
      </Accordion>
        ))}
      </Box>}
    </Container>
  )
}
export default Archive
