import { Box, Paper, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import ProjectPluginsActions from './Actions';
import ListSkeleton from '../../../../../common/Skeletons/ListSkeleton.component';

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
  const mgmtData = management?.data || {};
  const mgmtActions = management?.actions || {};

  const getBody = () => {
    const availableData = mgmtData.constitution;

    if (availableData) {
      return (
        <Box>
          <Typography variant="body1" component="p">
            {t('project-presentations.plugins.mgmt.status')}
            {': '}
            {t(`project-presentations.plugins.mgmt.status.${mgmtData.status}`)}
          </Typography>

          <Typography variant="body1" component="p">
            {t('project-presentations.plugins.mgmt.bylaws')}:
          </Typography>
          <ol>
            {mgmtData.constitution?.bylaws?.length
              ? mgmtData.constitution?.bylaws?.map((bylaw, i) => (
                  <li key={i}>
                    <Typography variant="body1" component="p">
                      {bylaw?.scope}: {bylaw?.definition}
                    </Typography>
                  </li>
                ))
              : t('project-presentations.plugins.mgmt.nobylaws')}
          </ol>
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
        <Box className="ProjectPresentation__SectionsPresentation">
          <Box className="ProjectPlugins__Body">
            <Typography
              className="ProjectPlugins__Heading__Name"
              variant="h6"
              component="h1"
              color="primary.main"
            >
              {t('project-presentations.plugins.mgmt')}
            </Typography>

            {isLoading ? (
              <ListSkeleton />
            ) : (
              <Box>
                {getBody()}
                <ProjectPluginsActions
                  projectPresentation={projectPresentation}
                  actions={{
                    ...mgmtActions,
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
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

ProjectPlugins.defaultProps = {
  isAdmin: false,
  projectPresentationActions: {},
};

ProjectPlugins.propTypes = {
  pluginData: PropTypes.object,
  onUpdateManagement: PropTypes.func,
  onCreateManagement: PropTypes.func,
  onGetManagement: PropTypes.func,
  isLoading: PropTypes.bool,
  isAdmin: PropTypes.bool,
  projectPresentation: PropTypes.object.isRequired,
  projectPresentationActions: PropTypes.object,
};

export default ProjectPlugins;
