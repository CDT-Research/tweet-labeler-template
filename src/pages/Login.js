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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState} from 'react'
import {useLogin} from '../hooks/useLogin'



const theme = createTheme();

const Login = () => {

  const {login, error, isPending, isCancelled} = useLogin()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  return (

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{

            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              fullWidth

              label="Email Address"
              name="email"
              autoComplete="off"
              autoFocus
            />
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"

              autoComplete="off"
            />

          {!isPending && <Button
            type="submit"

              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>}
            {isPending && <Button

              fullWidth
              disabled
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Logging in...
            </Button>}
            {isCancelled && <Typography>I am cancelled</Typography>}
            {error && <Typography>{error}</Typography>}




          </form>
        </Box>
      </Container>

  );
}
export default Login
