import { Cancel } from '@mui/icons-material';
import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from '@mui/material';
import React from 'react';
import fetchData from '../../../actions/utils/fetchData';

const ImagesList = ({ uploadedImages, setUploadedImages, dispatch }) => {
  const handleDelete = async (imageUrl) => {
    const fileName = imageUrl.split('uploads/')[1];
    console.log(fileName, "123456");
    dispatch({ type: 'START_LOADING' });

    const result = await fetchData(
      {
        url: `${process.env.REACT_APP_SERVER_URL}/s3/delete`,
        method: 'DELETE',
        body: { fileName },
      },
      dispatch
    );

    if (result) {
      setUploadedImages((prev) => prev.filter((image) => image !== imageUrl));
      dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          open: true,
          message: 'Image deleted successfully!',
          severity: 'success',
        },
      });
    }

    dispatch({ type: 'END_LOADING' });
  };

  return (
    <ImageList
      rowHeight={250}
      sx={{
        '&.MuiImageList-root': {
          gridTemplateColumns:
            'repeat(auto-fill, minmax(250px, 1fr))!important',
        },
      }}
    >
      {uploadedImages.map((image, index) => (
        <ImageListItem key={index} cols={1} rows={1}>
          <img
            src={image}
            alt="uploaded"
            loading="lazy"
            style={{ height: '100%' }}
          />
          <ImageListItemBar
            position="top"
            sx={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%)',
            }}
            actionIcon={
              <IconButton
                sx={{ color: 'white' }}
                onClick={() => handleDelete(image)}
              >
                <Cancel />
              </IconButton>
            }
          ></ImageListItemBar>
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default ImagesList;
