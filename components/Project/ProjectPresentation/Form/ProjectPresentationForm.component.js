import { Box, Dialog, Paper } from '@mui/material';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { resolveRoute, ROUTES } from '../../../../constants';
import SectionPresentation from '../View/Sections/ProjectPresentation/SectionPresentation.component';
import SectionPresentationHolder from '../View/Sections/ProjectPresentation/SectionPresentationHolder.component';
import SectionTabs from '../View/Sections/ProjectPresentation/SectionTabs.component';
import DialogEmbeddedNavbar from './DialogEmbeddedNavbar.component';

const SlideTransition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FadeTransition = React.forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />;
});

const ProjectPresentationForm = ({
  projectPresentation,
  isTriggeredAction,
}) => {
  const [activeSectionindex, setActiveSectionIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const fullScreenDialog = isMobile && isTriggeredAction;
  const router = useRouter();

  const closeDialog = () => {
    const editProjectURL = resolveRoute(
      ROUTES.projects.edit,
      projectPresentation.projectId
    );
    router.push(editProjectURL);
  };

  return (
    <Dialog
      className="ProjectPresentationForm ProjectPresentationForm__Container"
      open={true}
      TransitionComponent={isTriggeredAction ? SlideTransition : FadeTransition}
      onClose={closeDialog}
      maxWidth="lg"
      fullScreen={fullScreenDialog}
      fullWidth
    >
      <DialogEmbeddedNavbar
        projectPresentation={projectPresentation}
        isEmbeddedDialog={fullScreenDialog}
      />
      <Paper className="ProjectPresentation__MainSection">
        <Box className="ProjectPresentation__SectionsPresentation">
          <Box className="SectionsPresentation__PresentationArea">
            {projectPresentation.sections.map((s, i) => (
              <SectionPresentationHolder
                value={activeSectionindex}
                index={i}
                key={i}
              >
                <SectionPresentation
                  sectionTitle={s.title}
                  description={s.description}
                  mainMedia={s.mainMedia}
                />
              </SectionPresentationHolder>
            ))}
          </Box>
          <SectionTabs
            projectPresentation={projectPresentation}
            setActiveSectionIndex={setActiveSectionIndex}
            activeSectionindex={activeSectionindex}
          />
        </Box>
      </Paper>
    </Dialog>
  );
};

ProjectPresentationForm.defaultProps = {
  isTriggeredAction: false,
};

ProjectPresentationForm.propTypes = {
  projectPresentation: PropTypes.object.isRequired,
  isTriggeredAction: PropTypes.bool,
};

export default ProjectPresentationForm;
