import AddIcon from '@mui/icons-material/Add';
import ImageIcon from '@mui/icons-material/Image';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Box, Button, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { INPUT_FIELD_TYPES, MEDIA_TYPES } from '../../../../constants';

const MEDIA_OPTIONS_MAP = {
  [MEDIA_TYPES.IMAGE]: {
    icon: ImageIcon,
    label: 'common.media.options.image',
    dialogLabel: 'common.media.options.image.dialog',
    inputType: INPUT_FIELD_TYPES.IMAGE,
    classModifier: 'Image',
  },
  [MEDIA_TYPES.VIDEO_YOUTUBE]: {
    icon: YouTubeIcon,
    label: 'common.media.options.video',
    dialogLabel: 'common.media.options.video.dialog',
    inputType: INPUT_FIELD_TYPES.YOUTUBEVIDEO,
    classModifier: 'Youtube',
  },
};

const MediaAddOptions = ({
  allowedMediaTypes,
  onAddMediaOptionClick,
  disabled,
}) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [newOptionsVisible, setNewOptionsVisible] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
      {isMobile && (
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
        return isMobile ? (
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
        ) : (
          <Button
            className={`MediaList__Option MediaList__Option__${
              MEDIA_OPTIONS_MAP[option].classModifier || ''
            }`}
            key={option}
            startIcon={<OptionIcon />}
            onClick={handleInputDialogClickOpen(option)}
            disabled={disabled}
          >
            {t(MEDIA_OPTIONS_MAP[option].label)}
          </Button>
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
