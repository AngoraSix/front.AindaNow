import { getSession } from 'next-auth/react';
import PropTypes from 'prop-types';
import React from 'react';
import api from '../../../api';
import ProjectView from '../../../components/Project/ProjectView';
import ProjectViewLayout from '../../../layouts/ProjectViewLayout/ProjectViewLayout';
import logger from '../../../utils/logger';

const ProjectViewPage = ({ project }) => {
  // isCurrentContributor && useActiveSession();

  return (
    <ProjectViewLayout>
      <ProjectView project={project} />
    </ProjectViewLayout>
  );
};

ProjectViewPage.defaultProps = {};

ProjectViewPage.propTypes = {
  project: PropTypes.object.isRequired,
};

export const getServerSideProps = async (ctx) => {
  let props = {};
  const { projectId } = ctx.params,
    session = await getSession(ctx);
  const validatedToken =
    session?.error !== 'RefreshAccessTokenError' ? session : null;
  try {
    const project = await api.projects.getProject(projectId, validatedToken);
    props = {
      ...props,
      project,
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

export default ProjectViewPage;
