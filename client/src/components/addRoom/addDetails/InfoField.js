import React, { useState } from 'react';
import { useValue } from '../../../context/ContextProvider';
import { TextField, InputAdornment } from '@mui/material';
import { Check, Close } from '@mui/icons-material';

const InfoField = ({ mainProps, optionalProps = {}, minLength }) => {
  const { dispatch } = useValue();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;

    dispatch({
      type: 'UPDATE_DETAILS',
      payload: { [e.target.name]: value },
    });

    // Validate input length
    if (value.length < minLength) {
      setError(true);
      setSuccess(false); 
    } else {
      setError(false);
      setSuccess(true); 
    }
  };

  return (
    <TextField
      {...mainProps}
      {...optionalProps}
      error={error}
      helperText={error && `This field must be ${minLength} characters or more`}
      color={success ? 'success' : 'primary'}
      variant="outlined"
      onChange={handleChange}
      required
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {success ? <Check color="success" /> : error && <Close color="error" />}
          </InputAdornment>
        ),
      }}
    />
  );
};

export default InfoField;
