import PropTypes from 'prop-types';
import api from '../../../../../../../api';
import config from '../../../../../../../config';
import { useLoading, useNotifications } from '../../../../../../../hooks/app';
import ProjectPresentationActions from './ProjectPresentationActions.component';

const ProjectPresentationActionsContainer = ({
  projectPresentation,
  isAdmin,
}) => {
  const { doLoad } = useLoading();
  const { onError, onSuccess } = useNotifications();

  const onShowInterest = async () => {
    doLoad(true);
    try {
      let { data: showInterestResponse } = await api.front.addMemberToClub(
        projectPresentation.projectId,
        config.api.servicesAPIParams.clubsWellKnownContributorCandidatesType
      );
      onSuccess('Registered interest successfully');
    } catch (ex) {
      onError(
        `Error Registering interest in Project - ${
          ex.response?.data?.message || ex.message
        }`
      );
    } finally {
      doLoad(false);
    }
  };

  return (
    <ProjectPresentationActions
      projectPresentation={projectPresentation}
      onShowInterest={onShowInterest}
      isAdmin={isAdmin}
    />
  );
};

ProjectPresentationActionsContainer.defaultProps = {
  isAdmin: false,
};

ProjectPresentationActionsContainer.propTypes = {
  projectPresentation: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool,
};

export default ProjectPresentationActionsContainer;
