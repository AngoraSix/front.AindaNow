import { useSession } from 'next-auth/client';
import PropTypes from 'prop-types';
import React, { useReducer } from 'react';
import api from '../../api';
import ProjectsList from './ProjectsList.component';
import ProjectsListReducer, {
  INITIAL_STATE,
  updateDataAction
} from './ProjectsList.reducer';

const ProjectsListContainer = ({ data }) => {
  const [session, loading] = useSession();

  const [state, dispatch] = useReducer(ProjectsListReducer, {
    ...INITIAL_STATE,
    data,
  });

  const onNextPageClick = async () => {
    const {
      total,
      page,
      limit,
      search,
      data,
    } = await api.projects.fetchProjects(session.user.attributes, {
      page: state.data.page + 1,
      search: state.data.search,
    });

    const projects = state.data.projects.concat(data);

    dispatch(updateDataAction({ total, page, limit, search, projects }));
  };

  const onSearch = async (value) => {
    const {
      total,
      page,
      limit,
      search,
      data: projects,
    } = await api.projects.fetchProjects(session.user.attributes, {
      search: value,
    });

    dispatch(updateDataAction({ total, page, limit, search, projects }));
  };
  return (
    <ProjectsList
      {...state.data}
      onNextPageClick={onNextPageClick}
      onSearch={onSearch}
    />
  );
};

ProjectsListContainer.defaultProps = {
  data: {},
};
ProjectsListContainer.propTypes = {
  data: PropTypes.object,
};

export default ProjectsListContainer;
