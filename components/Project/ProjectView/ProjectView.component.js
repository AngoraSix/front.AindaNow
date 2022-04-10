import {
  Box, SwipeableDrawer, Typography
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/system';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import MediaHeader from './Sections/MediaHeader';
import ProjectPresentation from './Sections/ProjectPresentation/ProjectPresentation.component';

const drawerBleeding = 56;

const ProjectView = ({ project }) => {
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
    <div className="ProjectView ProjectView__Container">
      <MediaHeader media={project.sections.flatMap((s) => s.media)} />
      <ProjectPresentation project={project} />
    </div>
  );
};

ProjectView.defaultProps = {};

ProjectView.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProjectView;
