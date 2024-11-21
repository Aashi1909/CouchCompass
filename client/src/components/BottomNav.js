import {BottomNavigation, Box, BottomNavigationAction} from '@mui/material'
import {AddLocation, AddLocationAlt, Bed, LocationOn} from '@mui/icons-material'
import { useState } from 'react'
const BottomNav =() =>{
    const [value, setValue] = useState(0)
    return (
        <Box>
            <Paper elevation={3} sx={{position:'fixed', bottom:0, right:0, left:0, zIndex:2 }}>
                <BottomNavigation showLabels value = {value} onChange={(e, newValue)}>
                    <BottomNavigationAction label ='Map' icon={<LocationOn />} /> 
                    <BottomNavigationAction label ='Rooms' icon={<Bed />}/> 
                    <BottomNavigationAction label ='Add' icon={<AddLocationAlt />} />    
                    </BottomNavigation>

            </Paper>

        </Box>
    )
}

export default BottomNav 