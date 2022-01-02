import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useNotifications } from '../../../hooks/app';

const Input = styled('input')({
  display: 'none',
});

const readImageFile = async (file) => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target.result);
      };

      reader.readAsDataURL(file);
    } catch (err) {
      reject(err);
    }
  });
};

const getImageSrc = (file) => {
  let src = null;
  if (file) {
    if (typeof file === 'object' && file.blob) {
      src = file.blob;
    } else if (typeof file === 'string') {
      src = file;
    }
  }
  return src;
};

const FileDragAndDrop = ({ onChange }) => {
  const { onError } = useNotifications();
  const [imageSrc, setImageSrc] = useState(null);
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

    await processFiles(event.dataTransfer.files);
  };

  const onFileInputChange = async ({ target: { files } }) => {
    await processFiles(files);
  };

  const processFiles = async (files) => {
    let fileData = Array.from(files);
    fileData = await Promise.all(
      fileData.map(async (fileDataElement) => {
        if (!fileDataElement.type.startsWith('image/')) {
          onError('File is not an image');
          setImageSrc(null);
          return;
        }
        const blobURL = await loadImageSrc(fileDataElement);
        fileDataElement.blob = blobURL;
        return fileDataElement;
      })
    );
    onChange({ target: { value: fileData } });
  };

  const loadImageSrc = async (imageFile) => {
    let newImageSrc = imageFile ? getImageSrc(imageFile) : null;
    try {
      if (!newImageSrc) {
        newImageSrc = await readImageFile(imageFile);
      }
      setImageSrc(newImageSrc);
    } catch (err) {
      // do nothing.
    }
    return newImageSrc;
  };

  return (
    <div
      id="dropZone"
      className={`FileDragAndDrop__DropZone ${
        dragOverCount > 0 ? 'DragOver' : ''
      }`}
      onDrop={dropHandler}
      onDragOver={dragOverHandler}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
    >
      {!!imageSrc ? (
        <img className="FileDragAndDrop__Dropzone__Preview" src={imageSrc} />
      ) : (
        <div className="FileDragAndDrop__Dropzone__PreviewPlaceholder" />
      )}
      <FileUploadIcon className="FileDragAndDrop__DropZone__Icon" />
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
          className="FileDragAndDrop__DropZone__Button"
          sx={{ color: 'primary.dark' }}
        >
          Browse
        </Button>
      </label>
    </div>
  );
};

FileDragAndDrop.defaultProps = {};

FileDragAndDrop.propTypes = { onChange: PropTypes.func.isRequired };

export default FileDragAndDrop;
