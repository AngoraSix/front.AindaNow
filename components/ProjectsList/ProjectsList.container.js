import { useSession } from 'next-auth/react';
import PropTypes from 'prop-types';
import React, { useReducer } from 'react';
import api from '../../api';
import ProjectsList from './ProjectsList.component';
import ProjectsListReducer, {
  INITIAL_STATE,
  updateDataAction,
} from './ProjectsList.reducer';

const ProjectsListContainer = ({ data }) => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  const [state, dispatch] = useReducer(ProjectsListReducer, {
    ...INITIAL_STATE,
    data,
  });

  const onNextPageClick = async () => {
    const { total, page, limit, search, data } =
      await api.projects.fetchProjects(session.user.attributes, {
        page: state.data.page + 1,
        search: state.data.search,
      });

    const projectsList = state.data.projects.concat(data);

    dispatch(updateDataAction({ total, page, limit, search, projectsList }));
  };

  const onSearch = async (value) => {
    // @TODO: impelement search (https://trello.com/c/Bfhf1cQu/32-implement-basic-search-functionality)

    // const {
    //   total,
    //   page,
    //   limit,
    //   search,
    //   data: projects,
    // } =
    const projectsList = await api.projects.fetchProjectPresentations(
      session.user.attributes,
      {
        search: value,
      }
    );

    const total = projectsList.length,
      page = 1,
      limit = 5,
      search = value;
    dispatch(updateDataAction({ total, page, limit, search, projectsList }));
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
