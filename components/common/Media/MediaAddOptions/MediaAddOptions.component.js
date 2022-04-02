import AddIcon from '@mui/icons-material/Add';
import ImageIcon from '@mui/icons-material/Image';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Box, Button, IconButton } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { INPUT_FIELD_TYPES, MEDIA_TYPES } from '../../../../constants';

const MEDIA_OPTIONS_MAP = {
  [MEDIA_TYPES.IMAGE]: {
    icon: ImageIcon,
    label: 'Image',
    dialogLabel: 'Upload new image',
    inputType: INPUT_FIELD_TYPES.IMAGE,
    classModifier: 'Image',
  },
  [MEDIA_TYPES.VIDEO_YOUTUBE]: {
    icon: YouTubeIcon,
    label: 'Video',
    dialogLabel: 'Introduce the Youtube video ID or URL',
    inputType: INPUT_FIELD_TYPES.YOUTUBEVIDEO,
    classModifier: 'Youtube',
  },
};

const MediaAddOptions = ({
  allowedMediaTypes,
  onAddMediaOptionClick,
  disabled,
}) => {
  const router = useRouter();
  const [newOptionsVisible, setNewOptionsVisible] = useState(false);
  const isNotMobile = useMediaQuery('(min-width:600px)');

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      if (!shallow && url[url.length - 1] !== '#') {
        handleDialogClose();
      }
    };
    router.events.on('hashChangeStart', handleRouteChange);

    return () => {
      router.events.off('hashChangeStart', handleRouteChange);
    };
  }, []);

  const handleShowNewOptions = () => {
    setNewOptionsVisible(!newOptionsVisible);
  };

  const handleInputDialogClickOpen = (type) => () => {
    onAddMediaOptionClick(MEDIA_OPTIONS_MAP[type].inputType);
    router.push('#', undefined, { shallow: true });
  };

  const handleDialogClose = () => {
    onAddMediaOptionClick(null);
  };
  return (
    <Box className="MediaList__Add__Options">
      {!isNotMobile && (
        <IconButton
          className="MediaList__New__Option"
          key="new"
          onClick={handleShowNewOptions}
        >
          <AddIcon
            className={`MediaList__New__Option__Icon ${
              newOptionsVisible
                ? 'MediaList__New__Option__Icon__Close'
                : 'MediaList__New__Option__Icon__Add'
            }`}
          />
        </IconButton>
      )}
      {allowedMediaTypes.map((option) => {
        const OptionIcon = MEDIA_OPTIONS_MAP[option].icon;
        return isNotMobile ? (
          <Button
            className={`MediaList__Option MediaList__Option__${
              MEDIA_OPTIONS_MAP[option].classModifier || ''
            }`}
            key={option}
            startIcon={<OptionIcon />}
            onClick={handleInputDialogClickOpen(option)}
            disabled={disabled}
          >
            {MEDIA_OPTIONS_MAP[option].label}
          </Button>
        ) : (
          <IconButton
            className={`MediaList__Option ${
              newOptionsVisible
                ? 'MediaList__Option__Visible'
                : 'MediaList__Option__Hidden'
            } MediaList__Option__${
              MEDIA_OPTIONS_MAP[option].classModifier || ''
            }`}
            key={option}
            onClick={handleInputDialogClickOpen(option)}
            disabled={disabled}
          >
            <OptionIcon
              className={`MediaList__Option__Icon ${
                newOptionsVisible
                  ? 'MediaList__Option__Icon__Visible'
                  : 'MediaList__Option__Icon__Hidden'
              }`}
            />
          </IconButton>
        );
      })}
    </Box>
  );
};

MediaAddOptions.defaultProps = {
  allowedMediaTypes: Object.values(MEDIA_TYPES),
};

MediaAddOptions.propTypes = {
  allowedMediaTypes: PropTypes.array,
  onAddMediaOptionClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default MediaAddOptions;
