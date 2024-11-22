import React from 'react'
import { Container, StepButton, Stepper, Step, Stack,Box, Button} from '@mui/material'
import { useState } from 'react'
import AddDetails from './addDetails/AddDetails';
import AddImages from './addImages/AddImages';
import AddLocation from './addLocation/AddLocation';

const AddRoom = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [steps, setSteps] = useState([
    {label:'Location', completed: false},
    {label:'Details', completed: false},
    {label:'Images', completed: false},
  ]);

 const checkDisabled =() =>{
  if(activeStep === steps.length - 1){
    return false
  }
  const index = steps.findIndex(step => !step.completed)
  if(index !== -1) return false
  return true 
 }

 const handleNext = () => {
  if(activeStep < steps.length - 1){
    setActiveStep(activeStep => activeStep + 1)
  }
  else{
    const stepindex = steps.findIndex(step => !step.completed)
    setActiveStep(stepindex)
  }
 }

  return (
    <Container sx ={{my:4}}>
        <Stepper
        alternativeLabel
        nonLinear
        activeStep={activeStep}
        sx={{ mb: 3 }}
      >
        {steps.map((step, index) => (
          <Step key={step.label} completed={step.completed}>
            <StepButton onClick={() => setActiveStep(index)}>
              {step.label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <Box>
        {{
          0: <AddLocation />,
          1: <AddDetails />,
          2: <AddImages />,
        }[activeStep]}

      </Box>
      <Stack direction='row' sx={{pt:2, pb:7, justifyContent:'space-around'}}>
        <Button color='inherit' disabled={!activeStep} onClick={() => setActiveStep(activeStep=>activeStep - 1)}>Back
        </Button>
        <Button disabled ={checkDisabled()} onClick ={handleNext}>Next
        </Button>
      </Stack>
    </Container>
  )
}

export default AddRoom
