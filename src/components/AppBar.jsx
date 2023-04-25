import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ResponsiveAppBar = () => {
  const pages = ['¿Quien soy?', 'Tecnologias', 'Proyectos', 'Contactame'];
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {setAnchorElNav(event.currentTarget);};
  const handleCloseNavMenu = () => {setAnchorElNav(null);};

  const selected = (event) => {
    let itemSelected = event.currentTarget.innerText;
    let redirection = '#' + itemSelected;
    navigate(redirection);
  }

  const login = () =>{window.location.href = '/inicio-sesion';}

  return (
      <AppBar position='sticky'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            noWrap
            component="a"
            variant="h6"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              flexGrow: 1,
              fontFamily: 'cooper',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Dimitri Lagares
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={selected}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'cooper',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Dimitri Lagares
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={selected}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>  

          <Box sx={{ flexGrow: 0 }}>
              <Button  variant="filled" color='primary' onClick={login}>Iniciar Sesion</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}