import { useSession } from 'next-auth/react';
import PropTypes from 'prop-types';
import React, { useReducer } from 'react';
import api from '../../api';
import ProjectPresentation from '../../models/ProjectPresentation';
import ProjectPresentationsList from './ProjectPresentationsList.component';
import ProjectPresentationsListReducer, {
  INITIAL_STATE,
  updateDataAction,
} from './ProjectPresentationsList.reducer';

const ProjectPresentationsListContainer = ({
  projectPresentationsList: projectPresentationsListObj,
}) => {
  let projectPresentationsList = projectPresentationsListObj
    .filter((pr) => pr.project)
    .map((pr) => new ProjectPresentation(pr));
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  const [state, dispatch] = useReducer(ProjectPresentationsListReducer, {
    ...INITIAL_STATE,
    projectPresentationsList,
  });

  const onNextPageClick = async () => {
    const {
      total,
      page,
      limit,
      search,
      data: fetchedPresentationsListObj,
    } = await api.projects.fetchProjects(session.user.attributes, {
      page: state.data.page + 1,
      search: state.data.search,
    });

    fetchedPresentationsList = fetchedPresentationsListObj.map(
      (pr) => new ProjectPresentation(pr)
    );

    const projectPresentationsList = state.data.projectPresentationsList.concat(
      fetchedPresentationsList
    );

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
    const projectPresentationsListObj =
      await api.projects.fetchProjectPresentations(session.user.attributes, {
        search: value,
      });

    const total = projectPresentationsListObj.length,
      page = 1,
      limit = 5,
      search = value;

    const projectPresentationsList = projectPresentationsListObj.map(
      (pr) => new ProjectPresentation(pr)
    );
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
  projectPresentationsList: {},
};
ProjectPresentationsListContainer.propTypes = {
  projectPresentationsList: PropTypes.array,
};

export default ProjectPresentationsListContainer;
