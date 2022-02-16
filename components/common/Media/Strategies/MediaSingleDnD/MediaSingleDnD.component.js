import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Box, Button, Badge, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import DnDContainer from '../../DnDContainer.component';
import { useNotifications } from '../../../../../hooks/app';

const Input = styled('input')({
  display: 'none',
});

const MediaSingleDnD = ({ media, allowsMultiple, onMediaInput, limit }) => {
  const [activeMedia, setActiveMedia] = useState({ index: 0, upwards: true });
  const { onError } = useNotifications();

  const handleMediaInput = (files) => {
    let fileInput =
      Array.isArray(files) || files instanceof FileList
        ? Array.from(files)
        : [files];
    if (fileInput.length > limit) {
      onError('Limit exceeded - removed additional entries');
      fileInput.splice(limit);
    }
    if (fileInput) {
      onMediaInput(fileInput);
    } else {
      onMediaInput(fileInput.slice(0, 1));
    }
  };
  const onFileInputChange = ({ target: { files } }) => {
    handleMediaInput(files);
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
      <DnDContainer onMediaInput={handleMediaInput} classNameModifier="Single">
        {!!media && media.length ? (
          <Badge
            badgeContent={media.length === 1 ? 0 : media.length}
            color="primary"
            onClick={updateActiveMedia}
          >
            <Paper className="MediaSingleDnD__DropZone__Preview__Container">
              {media.map((m, index) => (
                <Box
                  key={m.key}
                  style={{
                    backgroundImage: `url(${m.thumbnailUrl}) `,
                  }}
                  className={`MediaSingleDnD__DropZone__Preview ${
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
          <div className="MediaSingleDnD__DropZone__PreviewPlaceholder" />
        )}
        <FileUploadIcon className="MediaSingleDnD__DropZone__Icon" />
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
            className="MediaSingleDnD__DropZone__Button"
            sx={{ color: 'primary.dark' }}
          >
            Browse
          </Button>
        </label>
      </DnDContainer>
    </Box>
  );
};

MediaSingleDnD.defaultProps = { media: [], limit: 15, allowsMultiple: false };

MediaSingleDnD.propTypes = {
  media: PropTypes.array,
  onMediaInput: PropTypes.func.isRequired,
  limit: PropTypes.number,
  allowsMultiple: PropTypes.bool,
};

export default MediaSingleDnD;
