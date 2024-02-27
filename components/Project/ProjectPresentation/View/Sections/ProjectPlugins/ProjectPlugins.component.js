import { Box, Paper, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import ProjectPluginsActions from './Actions';

const ProjectPlugins = ({
  projectPresentation,
  pluginData,
  onUpdateManagement,
  onCreateManagement,
  onGetManagement,
  isAdmin,
  isLoading,
}) => {
  const { t } = useTranslation('project-presentations.view');
  const { management } = pluginData;

  const availableData = management?.data?.constitution && !isLoading;

  const getBody = () => {
    if (availableData) {
      return (
        <Box>
          <Typography variant="body1" component="p">
            {t('project-presentations.plugins.mgmt.status')}
            {': '}
            {management?.data?.status}
          </Typography>

          <Typography variant="body1" component="p">
            {t('project-presentations.plugins.mgmt.bylaws')}:
          </Typography>
          <ol>
            {management?.data?.constitution?.bylaws?.length
              ? management?.data?.constitution?.bylaws?.map((bylaw, i) => (
                  <li key={i}>
                    <Typography variant="body1" component="p">
                      {bylaw?.scope}: {bylaw?.definition}
                    </Typography>
                  </li>
                ))
              : t('project-presentations.plugins.mgmt.nobylaws')}
          </ol>
          <Typography variant="h6" component="h1" color="primary.main">
            {t('project-presentations.actions')}
          </Typography>
        </Box>
      );
    } else if (isLoading) {
      return (
        <Box>
          <Typography variant="body1" component="p">
            {t('project-presentations.plugins.loading')}...
          </Typography>
        </Box>
      );
    } else {
      return (
        <Box>
          <Typography variant="body1" component="p">
            {t('project-presentations.plugins.mgmt.nodata')}
          </Typography>
        </Box>
      );
    }
  };

  return (
    <Box className="ProjectPlugins__Container">
      <Paper>
        <Typography
          className="ProjectPresentation__Heading__Name SectionPresentation__Project__Name"
          variant="h3"
          component="h1"
          color="primary.main"
        >
          Plugins
        </Typography>
        <Box className="ProjectPresentation__SectionsPresentation">
          <Box className="ProjectPlugins__Body">
            <Typography
              className="ProjectPlugins__Heading__Name"
              variant="h5"
              component="h1"
              color="primary.main"
            >
              {t('project-presentations.plugins.mgmt')}
            </Typography>

            {getBody()}

            <ProjectPluginsActions
              projectPresentation={projectPresentation}
              actions={{
                ...management?.actions,
              }}
              onActionDataChange={() => {}}
              onCreateManagement={onCreateManagement}
              onUpdateManagement={onUpdateManagement}
              onGetManagement={onGetManagement}
              actionFormData={{}}
              isAdmin={isAdmin}
              isLoading={isLoading}
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProjectPlugins;
