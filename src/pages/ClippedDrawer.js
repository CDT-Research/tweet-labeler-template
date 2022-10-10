import {useEffect, useState} from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import LoginIcon from '@mui/icons-material/Login';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddIcon from '@mui/icons-material/Add';
import ArchiveIcon from '@mui/icons-material/Archive';
// import Login from '../Login/Login'
import Dashboard from '../Dashboard/Dashboard'
import Button from '@mui/material/Button'
import {useNavigate, useLocation} from 'react-router-dom'

import {useAuthContext} from '../hooks/useAuthContext'
import {useLogout} from '../hooks/useLogout'
const drawerWidth = 240;

export default function ClippedDrawer({children}) {

  const navigate = useNavigate()
  const location = useLocation()
  const {user} = useAuthContext()
  const {logout, error, isPending} = useLogout()

//map to side menu buttons
  const pageItems = [
    {
    text:"Dashboard",
    icon: <DashboardIcon />,
  path: "/"


  },
  {
    text: "New Project",
    icon: <AddIcon />,
  path: "/newproject"
},
{
  text: "Archive",
  icon: <ArchiveIcon />,
path: "/archive"
},
  {
    text: "Upload Data",
    icon: <UploadIcon />,
  path: '/upload'


},
{
  text: "Export",
  icon: <DownloadIcon />,
path: "/export"
}
  ]
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" align="left" noWrap component="div" sx={{flexGrow:1}}>
            process.env.REACT_APP_ORG_NAME
          </Typography>

          {!user && <Button color="inherit" onClick={() => navigate('/login')}>Log In</Button>}
          {!user && <Button color="inherit" onClick={() => navigate('/signup')}>Sign up</Button>}

          {user && <Typography>signed in as {user.displayName}</Typography>}
          {user && <Button color="inherit" onClick={logout}>Log Out</Button>}
        </Toolbar>
      </AppBar>

      { user && user.uid==ADMIN_ID && <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>

          <List>
            {pageItems.map((item, index) => (
              <ListItem key={item.text} selected={item.path == location.pathname} disablePadding>
                <ListItemButton onClick = {() => navigate(item.path)}>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>}
      <Box component="main" sx={{ flexGrow: 1, p: 3}}>
        <Toolbar />


        {children}



      </Box>
    </Box>
  );
}
