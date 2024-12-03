import React, { useState } from 'react'
import { FormControl, Stack, RadioGroup,FormControlLabel, Radio  } from '@mui/material'
const AddDetails = () => {
  const [costType, setCostType] = useState();
  return (
    <div>
      <Stack sx={{
        alignItems: 'center', "&.MuiTextField-root": { width: '100%', maxWidth: '500', m:1 }
      }}>
        <FormControl>
          <RadioGroup name='"costType' value={} row onChange={handleCostTypeChange }>
            <FormControlLabel value={0} control={<Radio />} label="Free Stay" />
            <FormControlLabel value={1} control={<Radio />} label="Nominal Fee" />


          </RadioGroup>
          </FormControl> 

      </Stack>
    </div>
  )
}

export default AddDetails
