import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useNotifications } from '../../../hooks/app';
import { MEDIA_OPTIONS, INPUT_FIELD_TYPES } from '../../../constants';
import InputDialogs from '../InputDialogs'
import ImageIcon from '@mui/icons-material/Image';
import YouTubeIcon from '@mui/icons-material/YouTube';

const MEDIA_OPTIONS_MAP = {
  [MEDIA_OPTIONS.IMAGE]: {
    component: InputDialogs[INPUT_FIELD_TYPES.IMAGE],
    icon: ImageIcon
  },
  [MEDIA_OPTIONS.VIDEO_YOUTUBE]: {
    component: InputDialogs[INPUT_FIELD_TYPES.TEXT],
    icon: YouTubeIcon
  }}


open,
handleDialogClose,
onInputSubmit,
fieldValue,

const Media = ({ options, value }) => {
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
        if (!fileDataElement.type?.startsWith('image/')) {
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
      className={`Media__DropZone ${dragOverCount > 0 ? 'DragOver' : ''}`}
      onDrop={dropHandler}
      onDragOver={dragOverHandler}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
    >
      {!!imageSrc ? (
        <img className="Media__Dropzone__Preview" src={imageSrc} />
      ) : (
        <div className="Media__Dropzone__PreviewPlaceholder" />
      )}
      <FileUploadIcon className="Media__DropZone__Icon" />
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
          className="Media__DropZone__Button"
          sx={{ color: 'primary.dark' }}
        >
          Browse
        </Button>
      </label>
    </div>
  );
};

Media.defaultProps = { options: Object.values(MEDIA_OPTIONS), size: 1 };

Media.propTypes = { options: PropTypes.array, size: PropTypes.number };

export default Media;
