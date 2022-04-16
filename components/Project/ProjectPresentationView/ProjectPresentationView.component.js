import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/system';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import MediaHeader from './Sections/MediaHeader';
import ProjectPresentation from './Sections/ProjectPresentation/ProjectPresentation.component';

const drawerBleeding = 56;

const ProjectPresentationView = ({ projectPresentation }) => {
  const [openedDrawer, setOpenedDrawer] = useState(false);
  const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
  }));

  const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
  }));
  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpenedDrawer(open);
  };
  return (
    <div className="ProjectPresentationView ProjectPresentationView__Container">
      <MediaHeader
        media={projectPresentation.sections.flatMap((s) => s.media)}
      />
      <ProjectPresentation projectPresentation={projectPresentation} />
    </div>
  );
};

ProjectPresentationView.defaultProps = {};

ProjectPresentationView.propTypes = {
  projectPresentation: PropTypes.object.isRequired,
};

export default ProjectPresentationView;
