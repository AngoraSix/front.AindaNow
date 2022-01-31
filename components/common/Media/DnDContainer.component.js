import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import resolveToMediaArray from '../../../utils/media/mediaProcessor';

const DnDContainer = ({ onMediaInput, children, classNameModifier }) => {
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

    const processedFiles = await resolveToMediaArray(event.dataTransfer?.files);
    const processedTexts = await resolveToMediaArray(
      event.dataTransfer.getData('Text')
    );

    await onMediaInput([...processedFiles, ...processedTexts]);
  };
  return (
    <Box
      className={`Media__Container__${classNameModifier}
       MediaDnD__DropZone ${dragOverCount > 0 ? 'DragOver' : ''}`}
      onDrop={dropHandler}
      onDragOver={dragOverHandler}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
    >
      {children}
    </Box>
  );
};

DnDContainer.defaultProps = {
  classNameModifier: '',
};

DnDContainer.propTypes = {
  classNameModifier: PropTypes.string,
  onMediaInput: PropTypes.func.isRequired,
};

export default DnDContainer;
