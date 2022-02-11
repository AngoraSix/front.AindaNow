import PropTypes from 'prop-types';
import React, { useReducer, useEffect } from 'react';
import { INPUT_FIELD_TYPES, MEDIA_OPTIONS } from '../../../constants';
import { useNotifications } from '../../../hooks/app';
import { isImage, processImage } from '../../../utils/media/image';
import MediaDnD from './MediaDnD.component';
import Media from '../../../models/Media';
import MediaDnDReducer, {
  INITIAL_STATE,
  addMediaAction,
  changeOrderAction,
  setMediaAction,
} from './MediaDnD.reducer';

const MEDIA_TYPE_TO_OPTION = {
  [INPUT_FIELD_TYPES.YOUTUBEVIDEO]: MEDIA_OPTIONS.VIDEO_YOUTUBE,
  [INPUT_FIELD_TYPES.IMAGE]: MEDIA_OPTIONS.IMAGE,
};

const MediaDnDContainer = ({
  onChange,
  mediaData,
  single,
  allowedMediaTypes,
}) => {
  const [mediaDataState, dispatch] = useReducer(MediaDnDReducer, {
    ...INITIAL_STATE,
    mediaList: mediaData,
  });
  useEffect(() => {
    onChange(mediaDataState.mediaList);
  }, [mediaDataState.mediaList]);

  const { onError } = useNotifications();

  const onMediaInput = async (mediaInput) => {
    let mediaInputs =
      Array.isArray(mediaInput) || mediaInput instanceof FileList
        ? Array.from(mediaInput)
        : [mediaInput];
    // @TODO allow this, once we improve the single logic (Trello-l7DFMPvh)
    if (single) {
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
            allowedMediaTypes.includes(MEDIA_OPTIONS.IMAGE)
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
        single
          ? 'Input is not supported'
          : 'Some input is duplicated or not supported'
      );
    }
    if (single) {
      dispatch(setMediaAction(normalizedMedia));
    } else {
      dispatch(addMediaAction(normalizedMedia));
    }
  };

  const onModifyMediaOrder = async (targetKey, originKey) => {
    dispatch(changeOrderAction(targetKey, originKey));
  };
  return (
    <MediaDnD
      single={single}
      onMediaInput={onMediaInput}
      media={mediaDataState.mediaList}
      allowedMediaTypes={allowedMediaTypes}
      onModifyMediaOrder={onModifyMediaOrder}
    />
  );
};

MediaDnDContainer.defaultProps = {
  single: true,
  mediaData: [],
  allowedMediaTypes: Object.values(MEDIA_OPTIONS),
};

MediaDnDContainer.propTypes = {
  onChange: PropTypes.func.isRequired,
  single: PropTypes.bool,
  allowedMediaTypes: PropTypes.arrayOf(PropTypes.string),
  mediaData: PropTypes.arrayOf(PropTypes.object),
};

export default MediaDnDContainer;
