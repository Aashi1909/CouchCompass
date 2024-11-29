import { Paper } from '@mui/material';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ImagesList from './ImagesList';
import fetchData from '../../../actions/utils/fetchData';
import { useValue } from '../../../context/ContextProvider';


const url = process.env.REACT_APP_SERVER_URL + '/s3';

const AddImages = () => {
  const { dispatch } = useValue(); // Use dispatch from context

  const [files, setFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleUpload = async (file) => {
    console.log(file, 'file');
    dispatch({ type: 'START_LOADING' });


    const formData = new FormData();
    formData.append('image', file);

    console.log(formData, 'formdata');
    const result = await fetchData(
      {
        url: `${url}/upload`,
        method: 'POST',
        body: formData,
      },
      dispatch
    );

    console.log(result, 'resultttt');

    if (result) {

      setUploadedImages((prev) => {
        const updatedImages = [...prev, result.url];
        console.log("Updated uploadedImages inside callback:", updatedImages); // Log the updated state here
        return updatedImages;
      });
  

      dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          open: true,
          message: 'Image uploaded successfully!',
          severity: 'success',
        },
      });
    }

    dispatch({ type: 'END_LOADING' });
  };

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
    acceptedFiles.forEach((file) => handleUpload(file));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
  });

  return (
    <>
      <Paper
        sx={{
          cursor: 'pointer',
          background: '#fafafa',
          color: '#bdbdbd',
          border: '1px dashed #ccc',
          '&:hover': { border: '1px solid #ccc' },
        }}
      >
        <div style={{ padding: '16px' }} {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p style={{ color: 'green' }}>Drop the files here...</p>
          ) : (
            <p>Drag 'n' Drop some files here, or click to select files</p>
          )}
          <em>(images with *.jpeg, *.png, *.jpg extension will be accepted)</em>
        </div>
      </Paper>
      <ImagesList
        uploadedImages={uploadedImages}
        setUploadedImages={setUploadedImages}
        dispatch={dispatch}
      />
    </>
  );
};

export default AddImages;