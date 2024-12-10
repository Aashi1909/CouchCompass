import React, { useEffect, useState } from 'react'
import { Container, StepButton, Stepper, Step, Stack,Box, Button} from '@mui/material'
import {Send} from '@mui/icons-material'
import AddDetails from './addDetails/AddDetails';
import AddImages from './addImages/AddImages';
import AddLocation from './addLocation/AddLocation';
import { useValue } from '../../context/ContextProvider';
import {createRoom} from '../../actions/room'

const AddRoom = ({setPage}) => {
  const {state:{images, details, location, currentUser}, dispatch} = useValue(0)
  const [activeStep, setActiveStep] = useState(0);
  const [steps, setSteps] = useState([
    { label: 'Location', completed: false },
    { label: 'Details', completed: false },
    { label: 'Images', completed: false },
  ]);

  const [showSubmit, setShowSubmit] = useState(false);
  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep+1);
    } else {
      const stepIndex = findUnfinished();
      setActiveStep(stepIndex);
    }
  };
  const checkDisabled = () => {
    if (activeStep < steps.length - 1) return false;
    const index = findUnfinished();
    if (index !== -1) return false;
    return true;
  };
  const findUnfinished = () => {
    return steps.findIndex((step) => !step.completed);
  };
  const setComplete = (index, status) => {
   setSteps((prevSteps) =>
     prevSteps.map((step, i) =>
       i === index ? { ...step, completed: status } : step
     )
   );
 };

  useEffect(() => {
    if (activeStep === 2) {
      if (images && images.length > 0) {
        setComplete(2, true); // Mark "Images" step as complete
      } else {
        setComplete(2, false); // Mark as incomplete if no images
      }
    }
  }, [images, activeStep]);
  

  
 useEffect(() =>{
  if(activeStep === 1){
    if(details.title.length>4 && details.description.length>9 ){
      if(!steps[1].completed)
      {
        setComplete(1,true)
      }
  
    }else{
      if(steps[2].completed)
        {
          setComplete(2,false)
        }
    }
  }
 },[details])

 useEffect(() =>{
  if(activeStep === 0){
    if(location.lng && location.lat ){
      if(!steps[0].completed)
      {
        setComplete(0,true)
      }
  
    }else{
      if(steps[0].completed)
        {
          setComplete(0,false)
        }
    }
    
  }
 },[location])


 useEffect(() => {

  if (findUnfinished() === -1) {
    if (!showSubmit) {
      setShowSubmit(true);
    }
  } else {
    if (showSubmit)
      {
        setShowSubmit(false);

      } 
        
  }
}, [steps]);


 const handleSubmit = () => {
  const room ={
    lng:location.lng,
    lat:location.lat,
    title:details.title,
    description:details.description,
    price:details.price,
    images

  }
  createRoom(room, currentUser, dispatch, setPage)

 }

  return (
    <Container sx={{ my: 4 }}>
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
      <Box sx={{pb: 7}}>
        {
          {
            0: <AddLocation />,
            1: <AddDetails />,
            2: <AddImages />,
          }[activeStep]
        }
      <Stack
        direction="row"
        sx={{ pt: 2, justifyContent: 'space-around' }}
      >
        <Button
          color="inherit"
          disabled={!activeStep}
          onClick={() => setActiveStep((activeStep) => activeStep - 1)}
        >
          Back
        </Button>
        <Button disabled={checkDisabled()} onClick={handleNext}>
          Next
        </Button>
      </Stack>
      {showSubmit && (
        <Stack sx={{alignItems:'center'}}>
          <Button variant='contained' endIcon={<Send />} onClick={handleSubmit} >Submit</Button>
        </Stack>

      )}
      </Box>

    </Container>
  );
};

export default AddRoom;