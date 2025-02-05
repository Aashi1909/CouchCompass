import React from 'react'
import { Container, Alert, AlertTitle, Button } from '@mui/material'
import { Lock } from '@mui/icons-material'
import { useValue } from '../../context/ContextProvider'
const AccessMessage = () => {
    const {dispatch} = useValue()
  return (
    <Container sx={{py:5}}>
        <Alert severity='error' variant='outlined'>
            <AlertTitle>Forbidden Access </AlertTitle>
            Please Login or Register to access this page!
            <Button variant='outlined' sx={{ml:2}} startIcon ={<Lock />} onClick={() => dispatch({type: 'OPEN_LOGIN'})}>
            Login
            </Button>

        </Alert>


    </Container>
  )
}

export default AccessMessage
