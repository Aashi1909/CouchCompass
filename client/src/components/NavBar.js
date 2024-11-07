import React from 'react'
import {AppBar, Container, Toolbar, Box, IconButton, Typography, Button} from '@mui/material'
import {Menu, Lock} from '@mui/icons-material'
import photoURL from '../profile.jpeg'
import UserIcons from './user/UserIcons'
import { useValue } from '../context/ContextProvider'

const user= {
    name: 'John Doe',
    photoURL
}

const NavBar = () => {
    const {state: {currentUser}, dispatch} = useValue()
  return (
    <div>
        <AppBar>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Box sx = {{mr:1}}>
                        <IconButton size='large' color='inherit'>
                        <Menu />
                        </IconButton>
                    </Box>
                    <Typography variant ='h6' component= 'h1' noWrap sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex'}}}>
                        You are Welcome
                    </Typography>
                    <Typography variant ='h6' component= 'h1' noWrap sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none'}}}>
                        You 
                    </Typography>
                    {!currentUser ?(  <Button color='inherit' startIcon={<Lock />} onClick = {() => dispatch({type: 'UPDATE_USER', payload:user})} >
                    Login
                    </Button>) : (
                        <UserIcons />

                    )}
                  
                </Toolbar>
            </Container>
        </AppBar>
      
    </div>
  )
}

export default NavBar
