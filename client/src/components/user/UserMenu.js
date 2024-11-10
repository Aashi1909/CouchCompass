import { ListItemIcon, Menu, MenuItem } from '@mui/material'
import {Logout, Settings} from '@mui/icons-material'
import React from 'react'
import{useValue} from '../../context/ContextProvider'
import useCheckToken from '../../hooks/useCheckToken'

const UserMenu = ({anchorUserMenu, setAnchorUserMenu}) => {
  useCheckToken()
    const {dispatch, state: {currentUser}} = useValue()
    const handleCloseUserMenu = () => {
        setAnchorUserMenu(null)
    }

    const testAuthorization = async() =>{
      const url = process.env.REACT_APP_SERVER_URL + '/room'
      try{
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentUser?.token}`
          }
        })
        const data = await response.json()
        console.log(data)
        if(!data.success){
          if(response.status===401)
            dispatch({type:"UPDATE_USER", payload: null})
          throw new Error(data.message) 
        }
      }catch(error){
        console.log(error)
        dispatch({type:"UPDATE_ALERT", payload:{open: true, message: error.message, severity: "error" } })
        console.log(error)
      }
      

    }
  return (
    <Menu anchorEl={anchorUserMenu}
    open={Boolean(anchorUserMenu)}
    onClose={handleCloseUserMenu}
    onClick ={handleCloseUserMenu}>
    <MenuItem onClick={testAuthorization}>
    <ListItemIcon>
        <Settings fontSize="small" />
    </ListItemIcon>
    Profile
    </MenuItem>
    <MenuItem onClick={() => dispatch({type: 'UPDATE_USER', payload: null})}> 
    <ListItemIcon>
        <Logout fontSize="small" />
    </ListItemIcon>
    Logout
    </MenuItem>
    </Menu>
  )
}

export default UserMenu
