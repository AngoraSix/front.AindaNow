import { Box, Paper, Tab, Tabs } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import { useState } from 'react';
import TabPanel from '../../../common/TabPanel';
import MediaHeader from './Sections/MediaHeader';
import ProjectPlugins from './Sections/ProjectPlugins/ProjectPlugins.container';
import ProjectPresentation from './Sections/ProjectPresentation/ProjectPresentation.component';

import { useEffect, useRef } from 'react';

const ProjectPresentationView = ({
  projectPresentation,
  projectPresentationActions,
  isAdmin,
}) => {
  const { t } = useTranslation('project-presentations.view');
  const presentationRef = useRef();
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setTimeout(() => {
      presentationRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 600);
  }, []);

  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };

  return (
    <Box className="ProjectPresentationView ProjectPresentationView__Container">
      <MediaHeader
        media={projectPresentation.sections?.flatMap((s) => s.media)}
      />

      <Box className="ProjectPresentation ProjectPresentation__Container">
        <Box
          ref={presentationRef}
          className="ProjectPresentation__AreaExtension"
        />
        <Paper className="ProjectPresentation__MainSection">
          {isMobile && (
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="basic tabs example"
              >
                <Tab label={t('project-presentations.tabs.presentation')} />
                <Tab label={t('project-presentations.tabs.mgmt')} />
              </Tabs>
            </Box>
          )}
          {isMobile ? (
            <Box className="ProjectPresentationView__BodyContainer">
              <TabPanel value={tabValue} index={1}>
                <ProjectPlugins
                  projectPresentation={projectPresentation}
                  isAdmin={isAdmin}
                />
              </TabPanel>
              <TabPanel value={tabValue} index={0}>
                <ProjectPresentation
                  projectPresentation={projectPresentation}
                  isAdmin={isAdmin}
                  projectPresentationActions={projectPresentationActions}
                />
              </TabPanel>
            </Box>
          ) : (
            <Box className="ProjectPresentationView__BodyContainer">
              <ProjectPlugins
                projectPresentation={projectPresentation}
                isAdmin={isAdmin}
              />
              <ProjectPresentation
                projectPresentation={projectPresentation}
                isAdmin={isAdmin}
                projectPresentationActions={projectPresentationActions}
              />
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

ProjectPresentationView.defaultProps = {
  isAdmin: false,
  projectPresentationActions: {},
};

ProjectPresentationView.propTypes = {
  projectPresentation: PropTypes.object.isRequired,
  projectPresentationActions: PropTypes.object,
  isAdmin: PropTypes.bool,
};

export default ProjectPresentationView;
