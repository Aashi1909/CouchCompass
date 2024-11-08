import React from 'react'
import {Button} from '@mui/material'
import {Google} from '@mui/icons-material'
import { useState } from 'react'
import { useValue } from '../../context/ContextProvider'

const GoogleOneTapLogin = () => {
    const [disabled, setDisabled] = useState(false)
    const {dispatch} = useValue()

    const handleResponse = (response) => {
        console.log(response)
    }

    const handleGoogleLogin = () => {
        setDisabled(true)
        try {
            const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
            if (!clientId) {
              throw new Error('Client ID is missing. Please check your .env file.');
            }
      
            window.google.accounts.id.initialize({
              client_id: clientId,
              callback: handleResponse,
            });
      
            window.google.accounts.id.prompt((notification) => {
              if (notification.isNotDisplayed()) {
                console.error(
                  'Google One Tap prompt was not displayed:',
                  notification.getNotDisplayedReason()
                );
                throw new Error(
                  'Google One Tap prompt not displayed. Try clearing cookies or try again later.'
                );
              }
              if (
                notification.isSkippedMoment() ||
                notification.isDismissedMoment()
              ) {
                setDisabled(false);
              }
            });
          } catch (error) {
            dispatch({
              type: 'UPDATE_ALERT',
              payload: { open: true, severity: 'error', message: error.message },
            });
            console.error('Google One Tap error:', error);
          }
        };
  return (
   <Button variant='outlined' startIcon = {<Google />} disabled={disabled} onClick={handleGoogleLogin} >
        Login with Google
   </Button>
  )
}

export default GoogleOneTapLogin
