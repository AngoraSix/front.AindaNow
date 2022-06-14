import { getSession } from 'next-auth/react';
import PropTypes from 'prop-types';
import api from '../../../../../api';
import ProjectPresentationView from '../../../../../components/Project/ProjectPresentation/View';
import ProjectPresentationViewLayout from '../../../../../layouts/ProjectPresentationViewLayout/ProjectPresentationViewLayout';
import logger from '../../../../../utils/logger';

const ProjectPresentationViewPage = ({ projectPresentation, isAdmin }) => {
  return (
    <ProjectPresentationViewLayout>
      <ProjectPresentationView
        projectPresentation={projectPresentation}
        isAdmin={isAdmin}
      />
    </ProjectPresentationViewLayout>
  );
};

ProjectPresentationViewPage.defaultProps = {
  isAdmin: false,
};

ProjectPresentationViewPage.propTypes = {
  projectPresentation: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool,
};

export const getServerSideProps = async (ctx) => {
  let props = {};
  const { projectId, projectPresentationId } = ctx.params;
  const session = await getSession(ctx);
  const validatedToken =
    session?.error !== 'RefreshAccessTokenError' ? session : null;
  let isAdmin = false;
  try {
    const projectPresentation = await api.projects.getProjectPresentation(
      projectPresentationId,
      validatedToken
    );
    isAdmin =
      session?.user.id != null &&
      session?.user.id === projectPresentation.project.adminId &&
      projectPresentation?.projectId === projectId;
    props = {
      ...props,
      projectPresentation,
      isAdmin,
    };
  } catch (err) {
    logger.error('err', err);
  }

  return {
    props: {
      ...props,
      session,
    },
  };
};

export default ProjectPresentationViewPage;
