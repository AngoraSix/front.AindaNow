import { useSession } from 'next-auth/react';
import PropTypes from 'prop-types';
import React, { useReducer, useState } from 'react';
import api from '../../api';
import { useNotifications, useLoading, useDebounce } from '../../hooks/app';
import ProjectPresentation from '../../models/ProjectPresentation';
import ProjectPresentationsList from './ProjectPresentationsList.component';
import ProjectPresentationsListReducer, {
  INITIAL_STATE,
  updateDataAction,
} from './ProjectPresentationsList.reducer';

const ProjectPresentationsListContainer = ({
  projectPresentationsList: projectPresentationsListObj,
}) => {
  const _processPresentationListObj = (projectPresentationsListObj) => {
    return projectPresentationsListObj
      .filter((pr) => pr.project)
      .map((pr) => new ProjectPresentation(pr));
  };

  const projectPresentationsList = _processPresentationListObj(
    projectPresentationsListObj
  );

  const [state, dispatch] = useReducer(ProjectPresentationsListReducer, {
    ...INITIAL_STATE,
    projectPresentationsList,
  });

  const { onError } = useNotifications();
  const { doLoad } = useLoading();

  const { data: session, status } = useSession();

  const loading = status === 'loading';

  const [search, setSearch] = useState('');

  const debouncedSearchRequest = useDebounce(async () => {
    try {
      doLoad(true);
      const presentationsResponse = await api.front.searchProjectPresentations(
        search
      );

      const projectPresentationsList = _processPresentationListObj(
        presentationsResponse
      );

      dispatch(updateDataAction({ projectPresentationsList }));
    } catch (ex) {
      onError(
        `Error searching for project presentations - ${
          ex.response?.data?.message || ex.message
        }`
      );
    } finally {
      doLoad(false);
    }
  });

  const onSearch = (value) => {
    debouncedSearchRequest();
    setSearch(value);
  };

  const onNextPageClick = async () => {
    // const {
    //   total,
    //   page,
    //   limit,
    //   search,
    //   data: fetchedPresentationsListObj,
    // } = await api.projects.fetchProjects(session.user.attributes, {
    //   page: state.data.page + 1,
    //   search: state.data.search,
    // });
    // fetchedPresentationsList = fetchedPresentationsListObj.map(
    //   (pr) => new ProjectPresentation(pr)
    // );
    // const projectPresentationsList = state.data.projectPresentationsList.concat(
    //   fetchedPresentationsList
    // );
    // dispatch(
    //   updateDataAction({ total, page, limit, search, projectPresentationsList })
    // );
  };

  return (
    <ProjectPresentationsList
      {...state}
      onNextPageClick={onNextPageClick}
      onSearch={onSearch}
      search={search}
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
