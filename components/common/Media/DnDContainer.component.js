import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import resolveToMediaArray from '../../../utils/media/mediaProcessor';

const DnDContainer = ({ onMediaInput, children, classNameModifier }) => {
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: [NativeTypes.FILE, NativeTypes.URL],
      async drop(input) {
        const processedFiles = await resolveToMediaArray(input?.files);
        const processedTexts = await resolveToMediaArray(input?.urls);

        await onMediaInput([...processedFiles, ...processedTexts]);
      },
      collect: (monitor) => {
        const input = monitor.getItem();
        return {
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        };
      },
    }),
    [onMediaInput]
  );
  const isActive = canDrop && isOver;
  return (
    <Box
      ref={drop}
      className={`Media__Container__${classNameModifier}
       MediaDnD__DropZone ${isActive ? 'DragOver' : ''}`}
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
