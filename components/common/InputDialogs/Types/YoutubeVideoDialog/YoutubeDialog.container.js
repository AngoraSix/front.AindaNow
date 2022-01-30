import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import api from '../../../../../api';
import { INPUT_FIELD_TYPES } from '../../../../../constants';
import { useLoading } from '../../../../../hooks/app';
import YoutubeDialog from './YoutubeDialog.component';

const YOUTUBEURL_REGEX =
  /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
const YOUTUBEID_LENGTH = 11;

const YoutubeDialogContainer = ({ onChange, setIsValid, ...args }) => {
  const { doLoad } = useLoading();
  const [processedVideo, setProcessedVideo] = useState({
    isValid: false,
    videoId: '',
    thumbnailUrl: '',
  });
  const [fieldValue, setFieldValue] = useState('');

  useEffect(() => {
    setIsValid(false);
  }, []);

  const handleChange = async ({ target: { value } }) => {
    setFieldValue(value);
    let [isValid, id] = _extractId(value);
    if (isValid) {
      doLoad(true);
      const videoThumbnail = await _requestThumbnail(id);
      setProcessedVideo({
        isValid: !!videoThumbnail,
        videoId: id,
        thumbnailUrl: videoThumbnail,
      });
      setIsValid(!!videoThumbnail);
      onChange({
        target: {
          value: {
            type: INPUT_FIELD_TYPES.YOUTUBEVIDEO,
            thumbnailUrl: videoThumbnail,
            id,
          },
        },
      });
      doLoad(false);
    } else {
      setProcessedVideo({
        isValid: false,
        videoId: id,
        thumbnailUrl: '',
      });
      setIsValid(false);
    }
  };

  const _extractId = (value) => {
    // if it's a youtube url we'll retrieve the corresponding path value, otherwise the value (valid if length is 11)
    const youtubeMatch = value.match(YOUTUBEURL_REGEX);
    const videoId = youtubeMatch ? youtubeMatch[2] : value;
    return [videoId.length == YOUTUBEID_LENGTH, videoId];
  };

  const _requestThumbnail = async (videoId) => {
    return await api.thirdParties.fetchYoutubeVideoTumbnail(videoId);
  };

  return (
    <YoutubeDialog
      onChange={handleChange}
      {...processedVideo}
      fieldValue={fieldValue}
      {...args}
    />
  );
};

YoutubeDialogContainer.defaultProps = {};

YoutubeDialogContainer.propTypes = {
  onChange: PropTypes.func.isRequired,
  setIsValid: PropTypes.func,
};
export default YoutubeDialogContainer;
