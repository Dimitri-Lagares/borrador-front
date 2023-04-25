import './Login.css'
import { useState} from 'react'
import { Visibility, VisibilityOff} from '@mui/icons-material';
import { IconButton, OutlinedInput, InputLabel, InputAdornment, FormControl, Box, Button, Alert, TextField } from '@mui/material/';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Login = ({childToParentData}) => {
  
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [alertOne, setAlertOne] = useState(false);
  const [alertTwo, setAlertTwo] = useState(false);
  const [data, setData] = useState('')
  const navigate = useNavigate();

  
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {event.preventDefault();};
  const OnChangeUser = (event) => {setUser(event.target.value)};
  const OnChangePassword = (event) => {setPassword(event.target.value)};

  const login = () => {
    if (user === '' || password === ''){
       setAlertOne(true)
       AlertOneTimeOut() 
    }else {  
      axios.post('http://localhost:3055/inicio-sesion', {user, password})
      .then((response) => {
        setUser('')
        setPassword('')
        setData(response.data)
        childToParentData(data)
        navigate('/solicitudes')
      })
      .catch((err) => {
        setUser('')
        setPassword('')
        setData('')
        setAlertTwo(true)
        AlertTwoTimeOut()
        childToParentData(data) 
         });
      }
  }

const AlertOneTimeOut = () => {
  setTimeout(() => {
    setAlertOne(false);
  }, 3000);
}
  const AlertTwoTimeOut = () => {
    setTimeout(() => {
      setAlertTwo(false);
    }, 3000);
}

  return (
    
    <div className='container'>

    {alertOne &&  <Alert severity="warning">debes de llenar los campos</Alert>}
    {alertTwo &&  <Alert severity="error">Usuario o Contraseña incorrectos</Alert>}

    <h1 className='inicio-sesion'>Inicio de sesion</h1>
    <Box sx={{ minWidth: 275 }}>
    <div className='card'>
    
    <TextField
      color='primary'
      variant='outlined'
      label="Usuario"
      id="outlined"
      value={user}
      onChange={OnChangeUser}
      sx={{ m: 1, width: '25ch' }}
    />

      <FormControl sx={{m: 1, width: '25ch' }} variant="outlined">
      <InputLabel  htmlFor="outlined-adornment-password">Contraseña</InputLabel>
      <OutlinedInput
      value={password}
      onChange={OnChangePassword}
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <Button
        type="submit"
        variant="outlined"
        color="primary"
        onClick={login}
        >iniciar sesion</Button>
          </div>
        </Box>
      </div>
  )
}