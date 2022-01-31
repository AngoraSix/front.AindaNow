import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React from 'react';
import DnDContainer from '../DnDContainer.component';

const Input = styled('input')({
  display: 'none',
});

const MediaSingleDnD = ({ singleMedia, onMediaInput }) => {
  const onFileInputChange = async ({ target: { files } }) => {
    await onMediaInput(files);
  };

  return (
    <DnDContainer onMediaInput={onMediaInput} classNameModifier="Single">
      {!!singleMedia ? (
        <img
          className="MediaSingleDnD__DropZone__Preview"
          src={singleMedia.thumbnailUrl}
        />
      ) : (
        <div className="MediaSingleDnD__DropZone__PreviewPlaceholder" />
      )}
      <FileUploadIcon className="MediaSingleDnD__DropZone__Icon" />
      <label htmlFor="uploadFileButton">
        <Input
          accept="image/*"
          id="uploadFileButton"
          type="file"
          onChange={onFileInputChange}
        />
        <Button
          variant="outlined"
          component="span"
          className="MediaSingleDnD__DropZone__Button"
          sx={{ color: 'primary.dark' }}
        >
          Browse
        </Button>
      </label>
    </DnDContainer>
  );
};

MediaSingleDnD.defaultProps = { singleMedia: null };

MediaSingleDnD.propTypes = {
  singleMedia: PropTypes.object,
  onMediaInput: PropTypes.func.isRequired,
};

export default MediaSingleDnD;
