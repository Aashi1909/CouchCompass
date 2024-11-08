import React from 'react'
import {Button} from '@mui/material'
import {Google} from '@mui/icons-material'

const GoogleOneTapLogin = () => {
  return (
   <Button variant='outlined' startIcon = {<Google />} >
        Login with Google
   </Button>
  )
}

export default GoogleOneTapLogin
