import PropTypes from 'prop-types';
import React, { useEffect, useReducer } from 'react';
import api from '../../../../api/';
import { useLoading, useNotifications } from '../../../../hooks/app';
import AdministeredProjectsSection from './AdministeredProjectsSection.component';
import AdministeredProjectsSectionsReducer, {
  initAdministeredProjectsInfo,
  INITIAL_STATE,
} from './AdministeredProjectsSections.reducer';

const AdministeredProjectsSectionContainer = () => {
  const { doLoad } = useLoading();
  const { onError } = useNotifications();
  const [administeredProjectState, dispatch] = useReducer(
    AdministeredProjectsSectionsReducer,
    {
      ...INITIAL_STATE,
    }
  );

  useEffect(async () => {
    doLoad(true);
    try {
      const administeredProjectsInfo =
        await api.front.getAdministeredProjects();
      const clubsInfo = await api.front.getAdministeredProjectsClubs();
      dispatch(
        initAdministeredProjectsInfo({ administeredProjectsInfo, clubsInfo })
      );
    } catch (err) {
      if (err.response?.status !== 404) {
        onError(
          `Error retrieving administered projects info - ${
            err.response?.data?.message || err.message
          }`
        );
      }
    } finally {
      doLoad(false);
    }
  }, []);

  return (
    <AdministeredProjectsSection
      administeredProjects={administeredProjectState.administeredProjects}
    />
  );
};

AdministeredProjectsSectionContainer.defaultProps = {
  administeredProjects: [],
};

AdministeredProjectsSectionContainer.propTypes = {
  administeredProjects: PropTypes.array,
};

export default AdministeredProjectsSectionContainer;
