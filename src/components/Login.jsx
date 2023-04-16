import * as React from 'react';
import { useState} from 'react'
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Login.css'

export const Login = () => {

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  return (

    <div className='container'>

    <h1 className='inicio-sesion'>Inicio de sesion</h1>
    <Box sx={{ minWidth: 275 }}>
    <div className='card'>
    
    <TextField
      color='primary'
      variant='outlined'
      label="Usuario"
      id="outlined"
      sx={{ m: 1, width: '25ch' }}
    />
      <FormControl sx={{m: 1, width: '25ch' }} variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
      <OutlinedInput
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
        variant="contained"
        color="primary"
        >iniciar sesion</Button>
          </div>
        </Box>
      </div>
  )
}