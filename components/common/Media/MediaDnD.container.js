import PropTypes from 'prop-types';
import React, { useEffect, useReducer } from 'react';
import {
  INPUT_FIELD_TYPES,
  MEDIA_INPUT_STRATEGIES,
  MEDIA_TYPES,
} from '../../../constants';
import { useNotifications } from '../../../hooks/app';
import Media from '../../../models/Media';
import { isImage, processImage } from '../../../utils/media/image';
import MediaDnD from './MediaDnD.component';
import MediaDnDReducer, {
  addMediaAction,
  changeOrderAction,
  INITIAL_STATE,
  removeMediaItemAction,
  setMediaAction,
} from './MediaDnD.reducer';

const MEDIA_TYPE_TO_OPTION = {
  [INPUT_FIELD_TYPES.YOUTUBEVIDEO]: MEDIA_TYPES.VIDEO_YOUTUBE,
  [INPUT_FIELD_TYPES.IMAGE]: MEDIA_TYPES.IMAGE,
};

const MediaDnDContainer = ({
  onChange,
  mediaData,
  allowedMediaTypes,
  allowsMultiple,
  strategy,
  error,
}) => {
  const [mediaDataState, dispatch] = useReducer(MediaDnDReducer, {
    ...INITIAL_STATE,
    mediaList: mediaData,
  });
  useEffect(() => {
    onChange(mediaDataState.mediaList);
  }, [mediaDataState.mediaList, onChange]);

  const { onError } = useNotifications();

  const onMediaInput = async (mediaInput) => {
    let mediaInputs =
      Array.isArray(mediaInput) || mediaInput instanceof FileList
        ? Array.from(mediaInput)
        : [mediaInput];
    if (!allowsMultiple) {
      mediaInputs = [mediaInputs[0]];
    }
    const existingKeys = mediaDataState.mediaList.map((media) => media.key);
    const normalizedMedia = (
      await Promise.all(
        mediaInputs.map(async (mediaDataElement) => {
          // if it's normalized/processed
          if (
            mediaDataElement instanceof Media &&
            allowedMediaTypes.includes(
              MEDIA_TYPE_TO_OPTION[mediaDataElement.mediaType]
            ) &&
            !existingKeys.includes(mediaDataElement.key)
          ) {
            return mediaDataElement;
          }
          // if it's not yet proccessed (can only be image then)
          if (
            isImage(mediaDataElement) &&
            allowedMediaTypes.includes(MEDIA_TYPES.IMAGE)
          ) {
            const imageMedia = await processImage(mediaDataElement);
            if (!existingKeys.includes(imageMedia.key)) {
              return imageMedia;
            }
          }
          return null;
        })
      )
    ).filter((media) => !!media);
    if (!mediaInputs.length || normalizedMedia.length < mediaInputs.length) {
      onError(
        allowsMultiple
          ? 'Some input is duplicated or not supported'
          : 'Input is not supported'
      );
    }
    if (strategy === MEDIA_INPUT_STRATEGIES.LIST) {
      dispatch(addMediaAction(normalizedMedia));
    } else {
      dispatch(setMediaAction(normalizedMedia));
    }
  };

  const onRemoveMediaItem = (itemIndex) => {
    dispatch(removeMediaItemAction(itemIndex));
  };

  const onModifyMediaOrder = async (targetKey, originKey) => {
    dispatch(changeOrderAction(targetKey, originKey));
  };
  return (
    <MediaDnD
      strategy={strategy}
      allowsMultiple={allowsMultiple}
      onMediaInput={onMediaInput}
      media={mediaDataState.mediaList}
      allowedMediaTypes={allowedMediaTypes}
      onModifyMediaOrder={onModifyMediaOrder}
      onRemoveMediaItem={onRemoveMediaItem}
      error={error}
    />
  );
};

MediaDnDContainer.defaultProps = {
  strategy: MEDIA_INPUT_STRATEGIES.SINGLE,
  mediaData: [],
  allowedMediaTypes: Object.values(MEDIA_TYPES),
  allowsMultiple: false,
  error: false,
};

MediaDnDContainer.propTypes = {
  onChange: PropTypes.func.isRequired,
  allowedMediaTypes: PropTypes.arrayOf(PropTypes.string),
  mediaData: PropTypes.arrayOf(PropTypes.object),
  allowsMultiple: PropTypes.bool,
  strategy: PropTypes.oneOf(Object.values(MEDIA_INPUT_STRATEGIES)),
  error: PropTypes.bool,
};

export default MediaDnDContainer;
