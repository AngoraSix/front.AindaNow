import { useSession } from 'next-auth/react';
import PropTypes from 'prop-types';
import React, { useReducer } from 'react';
import api from '../../api';
import ProjectPresentationsList from './ProjectPresentationsList.component';
import ProjectPresentationsListReducer, {
  INITIAL_STATE,
  updateDataAction,
} from './ProjectPresentationsList.reducer';

const ProjectPresentationsListContainer = ({ data }) => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  const [state, dispatch] = useReducer(ProjectPresentationsListReducer, {
    ...INITIAL_STATE,
    ...data,
  });

  const onNextPageClick = async () => {
    const { total, page, limit, search, data } =
      await api.projects.fetchProjects(session.user.attributes, {
        page: state.data.page + 1,
        search: state.data.search,
      });

    const projectPresentationsList =
      state.data.projectPresentationsList.concat(data);

    dispatch(
      updateDataAction({ total, page, limit, search, projectPresentationsList })
    );
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
    const projectPresentationsList =
      await api.projects.fetchProjectPresentations(session.user.attributes, {
        search: value,
      });

    const total = projectPresentationsList.length,
      page = 1,
      limit = 5,
      search = value;
    dispatch(
      updateDataAction({ total, page, limit, search, projectPresentationsList })
    );
  };
  return (
    <ProjectPresentationsList
      {...state}
      onNextPageClick={onNextPageClick}
      onSearch={onSearch}
    />
  );
};

ProjectPresentationsListContainer.defaultProps = {
  data: {},
};
ProjectPresentationsListContainer.propTypes = {
  data: PropTypes.object,
};

export default ProjectPresentationsListContainer;
