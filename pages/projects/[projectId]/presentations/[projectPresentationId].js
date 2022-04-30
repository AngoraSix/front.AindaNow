import { getSession } from 'next-auth/react';
import PropTypes from 'prop-types';
import React from 'react';
import api from '../../../../api';
import ProjectPresentationView from '../../../../components/Project/ProjectPresentation/View';
import ProjectPresentationViewLayout from '../../../../layouts/ProjectPresentationViewLayout/ProjectPresentationViewLayout';
import logger from '../../../../utils/logger';

const ProjectPresentationViewPage = ({ projectPresentation }) => {
  return (
    <ProjectPresentationViewLayout>
      <ProjectPresentationView projectPresentation={projectPresentation} />
    </ProjectPresentationViewLayout>
  );
};

ProjectPresentationViewPage.defaultProps = {};

ProjectPresentationViewPage.propTypes = {
  projectPresentation: PropTypes.object.isRequired,
};

export const getServerSideProps = async (ctx) => {
  let props = {};
  const { projectPresentationId } = ctx.params,
    session = await getSession(ctx);
  const validatedToken =
    session?.error !== 'RefreshAccessTokenError' ? session : null;
  try {
    const projectPresentation = await api.projects.getProjectPresentation(
      projectPresentationId,
      validatedToken
    );
    props = {
      ...props,
      projectPresentation,
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
