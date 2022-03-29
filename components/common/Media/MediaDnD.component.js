import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { MEDIA_INPUT_STRATEGIES, MEDIA_TYPES } from '../../../constants';
import { useNotifications } from '../../../hooks/app';
import InputDialog from '../InputDialog';
import MediaAddOptions from './MediaAddOptions';
import MediaListDnD from './Strategies/MediaListDnD';
import MediaSingleDnD from './Strategies/MediaSingleDnD';
import DnDContainer from './DnDContainer.component';

const MediaDnD = ({
  strategy,
  allowsMultiple,
  media,
  allowedMediaTypes,
  onMediaInput,
  onModifyMediaOrder,
  onRemoveMediaItem,
  limit,
}) => {
  const { onError } = useNotifications();
  const [openedInputDialogType, setOpenedInputDialogType] = useState(null);

  const onOpenInputDialogType = (inputType) => {
    setOpenedInputDialogType(inputType);
  };

  const handleDialogClose = () => {
    setOpenedInputDialogType(null);
  };

  const onAddMedia = async (input) => {
    let mediaInput =
      Array.isArray(input) || input instanceof FileList
        ? Array.from(input)
        : [input];
    if (media.length + mediaInput.length > limit) {
      onError("Can't add all items - limit exceeded");
      return;
    }
    onMediaInput(mediaInput);
  };

  const isList = strategy === MEDIA_INPUT_STRATEGIES.LIST;

  return (
    <Box className="Media__Container">
      <MediaAddOptions
        allowedMediaTypes={allowedMediaTypes}
        onAddMediaOptionClick={onOpenInputDialogType}
        disabled={media.length >= limit}
      />
      <DnDContainer
        onMediaInput={onAddMedia}
        classNameModifier={isList ? 'List' : 'Single'}
        disabled={media.length >= limit}
        allowedMediaTypes={allowedMediaTypes}
      >
        {isList ? (
          <MediaListDnD
            media={media}
            onAddMedia={onAddMedia}
            onModifyMediaOrder={onModifyMediaOrder}
            onRemoveMediaItem={onRemoveMediaItem}
            limit={limit}
          />
        ) : (
          <MediaSingleDnD media={media} onAddMedia={onAddMedia} />
        )}
      </DnDContainer>
      <InputDialog
        open={!!openedInputDialogType}
        inputType={openedInputDialogType}
        handleDialogClose={handleDialogClose}
        onInputSubmit={onAddMedia}
        label="Media"
        allowsMultiple={allowsMultiple}
      />
    </Box>
  );
};

MediaDnD.defaultProps = {
  strategy: MEDIA_INPUT_STRATEGIES.SINGLE,
  media: [],
  allowedMediaTypes: Object.values(MEDIA_TYPES),
  allowsMultiple: false,
  limit: 15,
};

MediaDnD.propTypes = {
  media: PropTypes.arrayOf(PropTypes.object),
  onMediaInput: PropTypes.func.isRequired,
  onModifyMediaOrder: PropTypes.func.isRequired,
  allowedMediaTypes: PropTypes.arrayOf(PropTypes.string),
  onRemoveMediaItem: PropTypes.func.isRequired,
  allowsMultiple: PropTypes.bool,
  strategy: PropTypes.oneOf(Object.values(MEDIA_INPUT_STRATEGIES)),
  limit: PropTypes.number,
};

export default MediaDnD;
