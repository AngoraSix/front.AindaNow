import { Box, Dialog, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import SectionPresentation from '../View/Sections/ProjectPresentation/SectionPresentation.component';
import SectionPresentationHolder from '../View/Sections/ProjectPresentation/SectionPresentationHolder.component';
import SectionTabs from '../View/Sections/ProjectPresentation/SectionTabs.component';

const ProjectPresentationForm = ({ projectPresentation }) => {
  const [activeSectionindex, setActiveSectionIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      className="ProjectPresentationForm ProjectPresentationForm__Container"
      open={true}
      // onClose={onDialogClose}
      maxWidth="lg"
      fullScreen={isMobile}
      fullwidth
    >
      <Box className="ProjectPresentation ProjectPresentation__Container">
        <Box className="ProjectPresentation__AreaExtension" />
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
      </Box>
    </Dialog>
  );
};

ProjectPresentationForm.defaultProps = {};

ProjectPresentationForm.propTypes = {
  projectPresentation: PropTypes.object.isRequired,
};

export default ProjectPresentationForm;
