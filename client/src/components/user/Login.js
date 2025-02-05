import {Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, DialogActions, Button} from '@mui/material'
import { useValue } from '../../context/ContextProvider'
import {Close, Send} from '@mui/icons-material'
import { useState, useRef, useEffect } from 'react'
import PasswordField from './PasswordField'
import GoogleOneTapLogin from './GoogleOneTapLogin'
import { login, register } from '../../actions/user'

const Login = () => {
    const {state:{openLogin},dispatch} = useValue()
    const [title, setTitle] = useState('Login')
    const [isRegister, setIsRegister ] = useState(false) 
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()

    const handleClose = () =>{
        dispatch({type: 'CLOSE_LOGIN'})
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        const email = emailRef.current.value
        const password = passwordRef.current.value

        if(!isRegister)
          return login({email, password}, dispatch) 
        const name = nameRef.current.value
        const confirmPassword = confirmPasswordRef.current.value
        if(password!==confirmPassword)
            return dispatch({type: 'UPDATE_ALERT', payload:{open: true, message: 'passwords do not match', severity: "error" }})
            register({email, password, name}, dispatch)

        
       
    }
    useEffect(() => {
      isRegister ? setTitle('Register') : setTitle('Login')

    }, [isRegister] )
  return (
    <Dialog open={openLogin} onClose={handleClose}>
    <DialogTitle>
      {title}
      <IconButton
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          color: (theme) => theme.palette.grey[500], // Fixed arrow function syntax
        }}
        onClick={handleClose}
      >
        <Close />
      </IconButton>
    </DialogTitle>
  <form onSubmit={handleSubmit}>
    <DialogContent dividers>
        <DialogContentText>
            Please Fil your Information in the fileds below:
        </DialogContentText>
        {isRegister && (
            <TextField
              autoFocus
              margin="normal"
              variant="standard"
              id="name"
              label="Name"
              type="text"
              fullWidth
              inputRef={nameRef}
              inputProps={{ minLength: 2 }}
              required
            />
          )}
          <TextField
            autoFocus={!isRegister}
            margin="normal"
            variant="standard"
            id="email"
            label="Email"
            type="email"
            fullWidth
            inputRef={emailRef}
            required
          />
          <PasswordField {...{ passwordRef }} />
          {isRegister && (
            <PasswordField
              passwordRef={confirmPasswordRef}
              id="confirmPassword"
              label="Confirm Password"
            />
          )}
        </DialogContent>
    <DialogActions>
      <Button type='submit' variant='contained' endIcon ={<Send />}> 
        Submit
      </Button>
    </DialogActions>
  </form>
  <DialogActions sx = {{justifyContent:'left', p: '5px 24px'}}>
    {isRegister ? 'Do you have an Account? Sign In Now' : 'Dont have an Account? Create One'  }
    <Button onClick={() => setIsRegister(!isRegister)}>
      {isRegister ? 'Login' : 'Register'}
    </Button>
  </DialogActions>
  <DialogActions sx={{justifyContent:'center', py:'24px'}}>
    <GoogleOneTapLogin />
  </DialogActions>

  </Dialog>
  
  )
}

export default Login
