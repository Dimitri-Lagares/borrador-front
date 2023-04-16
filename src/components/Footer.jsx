import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

export const Footer = () => {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
        <TextField
          required
          label="Nombre"
          variant="outlined"
          placeholder='Dimitri'
        />

        <TextField
          required
          label="Correo"
          variant="outlined"
          placeholder='lagares.dimitri@gmail.com'
        />

        <TextField
          required
          label="Teléfono/Celular"
          variant="outlined"
          placeholder='3236642619'
        />

        <TextField
          required
          label="Solicitud"
          variant="outlined"
          placeholder='Digita tu solicitud'
        />

        <TextField
          required
          id="outlined-multiline-static"
          label="Comentario"
          multiline
          rows={4}
          placeholder="Por favor ingrese el comentario que deseas dejar"
        />

          <Button variant='contained' endIcon={<SendIcon />}>
          Send
          </Button>
    </Box>
    
    
  )
}