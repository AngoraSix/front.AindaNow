import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import { MEDIA_TYPES } from '../../../constants';
import { useNotifications } from '../../../hooks/app';
import resolveToMediaArray from '../../../utils/media/mediaProcessor';

const MEDIA_TYPES_TO_DND_ALLOWED_TYPES = {
  [MEDIA_TYPES.IMAGE]: NativeTypes.FILE,
  [MEDIA_TYPES.VIDEO_YOUTUBE]: NativeTypes.URL,
};

const DnDContainer = ({
  onMediaInput,
  children,
  classNameModifier,
  disabled,
  allowedMediaTypes,
}) => {
  const { onError } = useNotifications();
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: allowedMediaTypes.map((m) => MEDIA_TYPES_TO_DND_ALLOWED_TYPES[m]),
      async drop(input) {
        if (disabled) {
          onError("Can't add more items - limit reached");
          return;
        }
        const processedFiles = await resolveToMediaArray(
          input?.files,
          allowedMediaTypes
        );
        const processedTexts = await resolveToMediaArray(
          input?.urls,
          allowedMediaTypes
        );

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
  allowedMediaTypes: Object.values(MEDIA_TYPES),
};

DnDContainer.propTypes = {
  classNameModifier: PropTypes.string,
  onMediaInput: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  allowedMediaTypes: PropTypes.arrayOf(PropTypes.string),
};

export default DnDContainer;
