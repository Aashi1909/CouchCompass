import React, { useState } from 'react'
import { Badge, Box, IconButton, Tooltip, Avatar } from '@mui/material'
import { Mail, Notifications } from '@mui/icons-material'
import { useValue } from '../../context/ContextProvider'
import UserMenu from '../UserMenu'

const UserIcons = () => {
    const {state : {currentUser}} = useValue()

    const [anchorUserMenu, setAnchorUserMenu] = useState(null)

  return (
    <div>
      <Box>
        <IconButton size='large' color ='inherit'>
            <Badge color="error" badgeContent={5}>
                <Mail />
            </Badge>
        </IconButton>
        <IconButton size='large' color ='inherit'>
            <Badge color="error" badgeContent={20}>
                <Notifications />
            </Badge>
        </IconButton>
        <Tooltip title='Open User Settings' arrow>
            <IconButton onClick={(e) => setAnchorUserMenu(e.currentTarget)}>
                <Avatar src={currentUser?.photoURL} alt = {currentUser?.name}>
                    {currentUser?.name?.charAt(0).toUpperCase()}
                </Avatar>
            </IconButton>
        </Tooltip>
        <UserMenu {...{anchorUserMenu, setAnchorUserMenu}} />
      </Box>
    </div>
  )
}

export default UserIcons
