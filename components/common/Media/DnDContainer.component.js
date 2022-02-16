import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import resolveToMediaArray from '../../../utils/media/mediaProcessor';
import { useNotifications } from '../../../hooks/app';

const DnDContainer = ({
  onMediaInput,
  children,
  classNameModifier,
  disabled,
}) => {
  const { onError } = useNotifications();
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: [NativeTypes.FILE, NativeTypes.URL],
      async drop(input) {
        if (disabled) {
          onError("Can't add more items - limit reached");
          return;
        }
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
      className={`Media__Container Media__Container__${classNameModifier}
       MediaDnD__DropZone ${
         isActive
           ? !disabled
             ? 'DragOver'
             : 'DragOver DragOver__Disabled'
           : ''
       }`}
    >
      {children}
    </Box>
  );
};

DnDContainer.defaultProps = {
  classNameModifier: '',
  disabled: false,
};

DnDContainer.propTypes = {
  classNameModifier: PropTypes.string,
  onMediaInput: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default DnDContainer;
