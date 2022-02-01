import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useLoading } from '../../../../../hooks/app';
import { processYoutubeUrl } from '../../../../../utils/media/youtube';
import Media from '../../../../../models/Media';
import YoutubeDialog from './YoutubeDialog.component';

const YoutubeDialogContainer = ({ onChange, setIsValid, ...args }) => {
  const { doLoad } = useLoading();
  const [processedVideo, setProcessedVideo] = useState({
    isValid: false,
    videoMedia: new Media(),
  });
  const [fieldValue, setFieldValue] = useState('');

  useEffect(() => {
    setIsValid(false);
  }, []);

  const handleChange = async (value, videoMedia) => {
    if (Media.isMedia(videoMedia)) {
      setFieldValue(videoMedia.resourceId);
      const isValid = !!videoMedia.thumbnailUrl;
      setProcessedVideo({
        isValid,
        videoMedia,
      });
      setIsValid(isValid);
      onChange(videoMedia);
    } else {
      setFieldValue(value);
      doLoad(true);
      const videoMedia = await processYoutubeUrl(value);
      const isValid = !!videoMedia.thumbnailUrl;
      setProcessedVideo({
        isValid,
        videoMedia,
      });
      setIsValid(isValid);
      onChange({
        target: {
          value: videoMedia,
        },
      });
      doLoad(false);
    }
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
