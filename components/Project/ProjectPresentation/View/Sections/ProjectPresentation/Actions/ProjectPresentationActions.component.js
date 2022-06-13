import EditIcon from '@mui/icons-material/Edit';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { resolveRoute, ROUTES } from '../../../../../../../constants';
import { useActiveSession } from '../../../../../../../hooks/oauth';
import CircleLoadingButton from '../../../../../../common/Skeletons/CircleLoadingButton.component';

const ProjectPresentationActions = ({
  projectPresentation,
  onShowInterest,
  isAdmin,
}) => {
  const router = useRouter();
  const { session } = useActiveSession();
  const activeSession = session && !session.error;

  const showInterestButtons = (
    <React.Fragment>
      <LoadingButton
        className="ProjectPresentation__Heading__Actions__ShowInterest"
        variant="contained"
        loading={!activeSession}
        startIcon={<GroupAddIcon />}
        sx={{ display: { xs: 'none', sm: 'flex' } }}
        onClick={onShowInterest}
      >
        I'm Interested!
      </LoadingButton>
      <CircleLoadingButton
        className="ProjectPresentation__Heading__Actions__ShowInterest"
        loading={!activeSession}
        sxDisplay={{ xs: 'flex', sm: 'none' }}
        onClick={onShowInterest}
      >
        <GroupAddIcon fontSize="small" />
      </CircleLoadingButton>
    </React.Fragment>
  );

  const editButtons = (
    <React.Fragment>
      <LoadingButton
        className="ProjectPresentation__Heading__Actions__Edit"
        variant="contained"
        loading={!activeSession}
        startIcon={<EditIcon />}
        sx={{ display: { xs: 'none', sm: 'flex' } }}
        onClick={() =>
          router.push(
            resolveRoute(ROUTES.projects.edit, projectPresentation.projectId)
          )
        }
      >
        Edit
      </LoadingButton>
      <CircleLoadingButton
        className="ProjectPresentation__Heading__Actions__Edit"
        loading={!activeSession}
        sxDisplay={{ xs: 'flex', sm: 'none' }}
        onClick={() =>
          router.push(
            resolveRoute(ROUTES.projects.edit, projectPresentation.projectId)
          )
        }
      >
        <EditIcon fontSize="small" />
      </CircleLoadingButton>
    </React.Fragment>
  );

  return activeSession ? (
    <Box className="ProjectPresentation__Heading__Actions">
      {isAdmin ? editButtons : showInterestButtons}
    </Box>
  ) : (
    <Box></Box>
  );
};

ProjectPresentationActions.defaultProps = {
  isAdmin: false,
};

ProjectPresentationActions.propTypes = {
  isAdmin: PropTypes.bool,
  projectPresentation: PropTypes.object.isRequired,
};

export default ProjectPresentationActions;
