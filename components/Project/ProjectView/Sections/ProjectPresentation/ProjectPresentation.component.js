import { Box, Paper, Tab, Tabs } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import SectionPresentation from './SectionPresentation.component';
import SectionPresentationHolder from './SectionPresentationHolder.component';
import { styled } from '@mui/material/styles';

// const StyledTabs = styled((props) => (
//   <Tabs
//     {...props}
//     TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
//   />
// ))({
//   '& .MuiTabs-indicator': {
//     display: 'flex',
//     justifyContent: 'center',
//     backgroundColor: 'transparent',
//   },
//   '& .MuiTabs-indicatorSpan': {
//     maxWidth: 40,
//     width: '100%',
//     backgroundColor: '#635ee7',
//   },
// });

// const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
//   ({ theme }) => ({
//     textTransform: 'none',
//     fontWeight: theme.typography.fontWeightRegular,
//     fontSize: theme.typography.pxToRem(15),
//     marginRight: theme.spacing(1),
//     color: 'rgba(255, 255, 255, 0.7)',
//     '&.Mui-selected': {
//       color: '#fff',
//     },
//     '&.Mui-focusVisible': {
//       backgroundColor: 'rgba(100, 95, 228, 0.32)',
//     },
//   }),
// );

const ProjectPresentation = ({ project }) => {
  const [activeSectionindex, setActiveSectionIndex] = useState(0);

  const presentationRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      presentationRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 600);
  }, []);

  const selectSection = (_, selectedSection) => {
    setActiveSectionIndex(selectedSection);
  };

  return (
    <Box className="ProjectPresentation ProjectPresentation__Container">
      <Box
        ref={presentationRef}
        className="ProjectPresentation__AreaExtension"
      />
      <Paper className="ProjectPresentation__MainSection">
        {project.name && ( // @TODO, should be always present after Trello-Ndk3m28f
          <Typography
            variant="h1"
            component="h3"
            align="right"
            color="primary.main"
          >
            {project.name}
          </Typography>
        )}
        <Box className="ProjectPresentation__SectionsPresentation">
          <Box className="SectionsPresentation__PresentationArea">
            {project.sections.map((s, i) => (
              <SectionPresentationHolder
                value={activeSectionindex}
                index={i}
                key={i}
              >
                <SectionPresentation
                  sectionTitle={s.title !== project.name ? s.title : null}
                  description={s.description}
                  mainMedia={s.mainMedia}
                />
              </SectionPresentationHolder>
            ))}
          </Box>
          <Box className="SectionsPresentation__SectionsTabs">
            <Tabs
              orientation="vertical"
              variant="scrollable"
              indicatorColor="secondary"
              value={activeSectionindex}
              onChange={selectSection}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1, borderColor: 'divider' }}
            >
              {project.sections.map((s, i) => (
                <Tab key={i} label={s.title} />
              ))}
            </Tabs>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

ProjectPresentation.defaultProps = {};

ProjectPresentation.propTypes = {};

export default ProjectPresentation;
