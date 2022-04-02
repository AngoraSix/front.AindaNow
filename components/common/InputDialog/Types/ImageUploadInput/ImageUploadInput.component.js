import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Badge, Box, Button, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { MEDIA_TYPES } from '../../../../../constants';
import DnDContainer from '../../../Media/DnDContainer.component';

const Input = styled('input')({
  display: 'none',
});

const ACTIVE_MEDIA_INIT_STATE = { index: 0, upwards: true };

const ImageUploadInput = ({ handleMediaInput, media, allowsMultiple }) => {
  const [activeMedia, setActiveMedia] = useState(ACTIVE_MEDIA_INIT_STATE);

  const onFileInputChange = ({ target: { files } }) => {
    onInput(files);
  };

  const onInput = (media) => {
    setActiveMedia(ACTIVE_MEDIA_INIT_STATE);
    handleMediaInput(media);
  };

  const updateActiveMedia = () => {
    const reachedLimit = activeMedia.upwards
      ? activeMedia.index === media.length - 1
      : activeMedia.index === 0;
    setActiveMedia({
      index:
        activeMedia.upwards ^ reachedLimit
          ? activeMedia.index + 1
          : activeMedia.index - 1,
      upwards: reachedLimit ? !activeMedia.upwards : activeMedia.upwards,
    });
  };

  return (
    <Box>
      <DnDContainer
        onMediaInput={onInput}
        classNameModifier="ImageUpload"
        allowedMediaTypes={[MEDIA_TYPES.IMAGE]}
      >
        {!!media && media.length ? (
          <Badge
            badgeContent={media.length === 1 ? 0 : media.length}
            color="primary"
            onClick={media.length > 1 ? updateActiveMedia : () => {}}
          >
            <Paper className="ImageUploadInput__DropZone__Preview__Container">
              {media.map((m, index) => (
                <Box
                  key={m.key}
                  style={{
                    backgroundImage: `url(${m.thumbnailUrl}) `,
                  }}
                  className={`ImageUploadInput__DropZone__Preview ${
                    index < activeMedia.index
                      ? 'Left'
                      : index > activeMedia.index
                      ? 'Right'
                      : 'Active'
                  }`}
                />
              ))}
            </Paper>
          </Badge>
        ) : (
          <Box className="ImageUploadInput__DropZone__PreviewPlaceholder" />
        )}
        <FileUploadIcon className="ImageUploadInput__DropZone__Icon" />
        <label htmlFor="uploadFileButton">
          <Input
            accept="image/*"
            id="uploadFileButton"
            type="file"
            onChange={onFileInputChange}
            multiple={allowsMultiple}
          />
          <Button
            variant="outlined"
            component="span"
            className="ImageUploadInput__DropZone__Button"
            sx={{ color: 'primary.dark' }}
          >
            Browse
          </Button>
        </label>
      </DnDContainer>
    </Box>
  );
};

ImageUploadInput.defaultProps = { media: [], allowsMultiple: false };

ImageUploadInput.propTypes = {
  handleMediaInput: PropTypes.func.isRequired,
  media: PropTypes.array,
  allowsMultiple: PropTypes.bool,
};

export default ImageUploadInput;
