import { Dialog } from '@mui/material';
import Slide from '@mui/material/Slide';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { resolveRoute, ROUTES } from '../../../../../constants';
import ProjectPresentationDialogNavbar from './ProjectPresentationDialogNavbar.component';

const SlideTransition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProjectPresentationDialog = ({ projectId, children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();

  const closeDialog = () => {
    const editProjectURL = resolveRoute(ROUTES.projects.edit, projectId);
    router.push(editProjectURL, editProjectURL, { shallow: true });
  };

  return (
    <Dialog
      className="ProjectPresentationDialog__Dialog"
      open={true}
      TransitionComponent={SlideTransition}
      onClose={closeDialog}
      maxWidth="lg"
      fullScreen={isMobile}
      fullWidth
    >
      <ProjectPresentationDialogNavbar
        projectId={projectId}
        isEmbeddedDialog={true}
      />
      {children}
    </Dialog>
  );
};

ProjectPresentationDialog.defaultProps = {};

ProjectPresentationDialog.propTypes = {
  projectId: PropTypes.string.isRequired,
};

export default ProjectPresentationDialog;
