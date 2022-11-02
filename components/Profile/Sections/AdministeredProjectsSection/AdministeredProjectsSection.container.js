import PropTypes from 'prop-types';
import React, { useEffect, useReducer } from 'react';
import api from '../../../../api/';
import { useLoading, useNotifications } from '../../../../hooks/app';
import AdministeredProjectsSection from './AdministeredProjectsSection.component';
import AdministeredProjectsSectionsReducer, {
  initAdministeredProjectsInfo,
  INITIAL_STATE,
  updateMembersData,
} from './AdministeredProjectsSections.reducer';

const AdministeredProjectsSectionContainer = ({
  contributorId,
  isCurrentContributor,
}) => {
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
      const administeredProjectsInfo = await api.front.getAdministeredProjects(
        contributorId
      );
      const clubsInfo =
        (await api.front.getAdministeredProjectsClubs(contributorId)) || [];
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

  const loadMembers = async (members) => {
    // ACA cambiar por members y merge data con nuevos attributes!
    doLoad(true);
    try {
      if (members) {
        const memberIds = members.map((m) => m.contributorId);
        const membersResponse = await api.front.getContributors(memberIds);
        const membersData = membersResponse.map((member) => ({
          ...member,
          ...(members.find((m) => m.id === member.contributorId) || {}),
        }));
        dispatch(updateMembersData({ membersData }));
      } else {
        dispatch(updateMembersData({ membersData: null }));
      }
    } catch (err) {
      if (err.response?.status !== 404) {
        onError(
          `Error retrieving contributors data - ${
            err.response?.data?.message || err.message
          }`
        );
      }
    } finally {
      doLoad(false);
    }
  };

  return (
    <AdministeredProjectsSection
      administeredProjects={administeredProjectState.administeredProjects}
      selectedClubMembersData={administeredProjectState.membersData}
      loadMembers={loadMembers}
      isCurrentContributor={isCurrentContributor}
    />
  );
};

AdministeredProjectsSectionContainer.defaultProps = {
  isCurrentContributor: false,
};

AdministeredProjectsSectionContainer.propTypes = {
  contributorId: PropTypes.string.isRequired,
  isCurrentContributor: PropTypes.bool,
};

export default AdministeredProjectsSectionContainer;
