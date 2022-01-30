import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const Input = styled('input')({
  display: 'none',
});

const MediaSingleDnD = ({ singleMedia, onMediaInput }) => {
  const [dragOverCount, setDragOver] = useState(0);

  const dragOverHandler = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const dragEnterHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragOver(dragOverCount + 1);
  };

  const dragLeaveHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragOver(dragOverCount - 1);
  };

  const dropHandler = async (event) => {
    event.stopPropagation();
    event.preventDefault();

    setDragOver(0);

    await onMediaInput(event.dataTransfer.files);
  };

  const onFileInputChange = async ({ target: { files } }) => {
    await onMediaInput(files);
  };

  return (
    <div
      className={`MediaSingleDnD__DropZone ${
        dragOverCount > 0 ? 'DragOver' : ''
      }`}
      onDrop={dropHandler}
      onDragOver={dragOverHandler}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
    >
      {!!singleMedia ? (
        <img
          className="MediaSingleDnD__Dropzone__Preview"
          src={singleMedia.thumbnailUrl}
        />
      ) : (
        <div className="MediaSingleDnD__Dropzone__PreviewPlaceholder" />
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
    </div>
  );
};

MediaSingleDnD.defaultProps = { singleMedia: null };

MediaSingleDnD.propTypes = {
  singleMedia: PropTypes.object,
  onMediaInput: PropTypes.func.isRequired,
};

export default MediaSingleDnD;
