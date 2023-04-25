import axios from 'axios';
import {useState, useEffect} from 'react';
import { Grid, IconButton, tableCellClasses, TableCell, Table, TableBody, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, styled, Alert, TextField, Button, Typography} from '@mui/material';
import {Edit, Delete} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const Solicitudes = () => {

  const [data, setData] = useState([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showSuccessAlert2, setShowSuccessAlert2] = useState(false);
  const [idformulario, setIdformulario] = useState("");
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("")
  const [telefono, setTelefono] = useState("");
  const [solicitud, setSolicitud] = useState("")
  const [comentario, setComentario] =useState("")
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const navigate = useNavigate()
  
  const onNameChange = e => setNombre(e.target.value)
  const onEmailChange = e => setCorreo(e.target.value)
  const onCelphoneChange = e => setTelefono(e.target.value)
  const onRequestChange = e => setSolicitud(e.target.value)
  const onCommentChange = e => setComentario(e.target.value)
  const handleClose = () => {setOpen(false);};
  const handleClose2 = () => {setOpen2(false);};
  const redirectToHome = () => {navigate('/')}
  
  useEffect(()=>{
    getData()
  },[])

  const getData = async () => {
    try{
      const {data: response} = await axios.get('http://localhost:3055/formulario')
      setData(response)
    } catch (error) {
      console.log(error.message)
    }
  }

  const tableEdit = ((getTableData) => {
    setIdformulario(getTableData.idformulario)
    setNombre(getTableData.nombre)
    setCorreo(getTableData.correo)
    setTelefono(getTableData.telefono)
    setSolicitud(getTableData.solicitud)
    setComentario(getTableData.comentario)
    setOpen(true)
  })

  const tableDelete = ((getTableData) => {
    setIdformulario(getTableData.idformulario)
    setNombre(getTableData.nombre)
    setCorreo(getTableData.correo)
    setTelefono(getTableData.telefono)
    setSolicitud(getTableData.solicitud)
    setComentario(getTableData.comentario)
    setOpen2(true)
  })

  const confirmedDelete = () => {
    axios.delete(`http://localhost:3055/eliminar-fila/${idformulario}`).then(() =>{
    setOpen2(false)
    getData()
    setShowSuccessAlert2(true)
    showSuccessAlert2TimeOut()  
    })
  }

  const buttonUpdate = (() => {
    axios.put(`http://localhost:3055/actualizar/${idformulario}`, {idformulario, nombre, correo, telefono, solicitud, comentario})
    .then(()=>{
      getData()
      setNombre("")
      setCorreo("")
      setTelefono("")
      setSolicitud("")
      setComentario("")
      setIdformulario("")
      setShowSuccessAlert(true)
      showSuccessAlertTimeOut()
      setOpen(false)
    })
  
  })

  const showSuccessAlertTimeOut = () => {
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 6000);
  }

  const showSuccessAlert2TimeOut = () => {
    setTimeout(() => {
      setShowSuccessAlert2(false);
    }, 6000);
  }
  
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Editando fila</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Termina de editar la fila y presiona actualizar
          </DialogContentText>

      <TextField sx={{m:1}} variant="filled" id="outlined-basic" label="Nombre" value={nombre} onChange={onNameChange}/>
      <TextField sx={{m:.7}} variant="filled" id="outlined-basic" label="Correo" value={correo} onChange={onEmailChange}/>
      <TextField sx={{m:.7}} variant="filled" id="outlined-basic" label="telefono" value={telefono} onChange={onCelphoneChange} type='number'/>
      <TextField sx={{m:.7}} variant="filled" id="outlined-basic" label="solicitud" value={solicitud} onChange={onRequestChange}/>
      <TextField sx={{m:.7}} variant="filled" id="outlined-basic" label="comentario" value={comentario} onChange={onCommentChange}/>
        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
      <Button onClick={buttonUpdate}>actualizar</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open2} onClose={handleClose2}>
        <DialogTitle>¿Estas seguro que deseas eliminar la fila?</DialogTitle>
        <DialogContent>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="center">Nombre</StyledTableCell>
            <StyledTableCell align="center">Correo</StyledTableCell>
            <StyledTableCell align="center">Telefono</StyledTableCell>
            <StyledTableCell align="center">Solicitud</StyledTableCell>
            <StyledTableCell align="center">Comentario</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <StyledTableRow key={idformulario}>
              <StyledTableCell component="th" scope="row">{idformulario}</StyledTableCell>
              <StyledTableCell align="center">{nombre}</StyledTableCell>
              <StyledTableCell align="center">{correo}</StyledTableCell>
              <StyledTableCell align="center">{telefono}</StyledTableCell>
              <StyledTableCell align="center">{solicitud}</StyledTableCell>
              <StyledTableCell align="center">{comentario}</StyledTableCell>
            </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
          <Button sx={{m:1}}  variant='outlined' onClick={handleClose2}>Cancelar</Button>
          <Button sx={{m:1}} variant='outlined' onClick={() => {confirmedDelete()}} startIcon={<Delete />}>Eliminar</Button>
        </DialogContent>
      </Dialog>

        {showSuccessAlert && <Alert severity="success">Actualizado correctamente</Alert>}
        {showSuccessAlert2 && <Alert severity="success">Eliminado correctamente</Alert>}
      <div style={{display:'flex'}}>
        <Typography>Solicitudes</Typography>
      </div>
        <Button style={{ ml : "auto" }} onClick={redirectToHome} variant='contained'>Regresar al inicio</Button>

          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="center">Nombre</StyledTableCell>
            <StyledTableCell align="center">Correo</StyledTableCell>
            <StyledTableCell align="center">Telefono</StyledTableCell>
            <StyledTableCell align="center">Solicitud</StyledTableCell>
            <StyledTableCell align="center">Comentario</StyledTableCell>
            <StyledTableCell align="center">Editar</StyledTableCell>
            <StyledTableCell align="center">Eliminar</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.idformulario}>
              <StyledTableCell component="th" scope="row">{row.idformulario}</StyledTableCell>
              <StyledTableCell align="center">{row.nombre}</StyledTableCell>
              <StyledTableCell align="center">{row.correo}</StyledTableCell>
              <StyledTableCell align="center">{row.telefono}</StyledTableCell>
              <StyledTableCell align="center">{row.solicitud}</StyledTableCell>
              <StyledTableCell align="center">{row.comentario}</StyledTableCell>
              <StyledTableCell align="center"><IconButton onClick={() => {tableEdit(row)}}><Edit/></IconButton></StyledTableCell>
              <StyledTableCell align="center"><IconButton onClick={() => {tableDelete(row)}}><Delete/></IconButton></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
} 