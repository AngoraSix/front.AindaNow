import PropTypes from 'prop-types';
import React, { useEffect, useReducer } from 'react';
import api from '../../../../api/';
import { useLoading, useNotifications } from '../../../../hooks/app';
import Club from '../../../../models/Club';
import { processHateoasCollection } from '../../../../utils/rest/hateoas/hateoasUtils';
import AdministeredProjectsSection from './AdministeredProjectsSection.component';
import AdministeredProjectsSectionsReducer, {
  INITIAL_STATE,
  initAdministeredProjectsInfo,
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

  useEffect(() => {
    const fetchData = async () => {
      doLoad(true);
      try {
        const administeredProjectsInfo =
          await api.front.getAdministeredProjects(contributorId);
        const filteredAdministeredProjectsInfo = isCurrentContributor
          ? administeredProjectsInfo
          : administeredProjectsInfo.filter((ap) => ap.presentations);

        const administeredClubsResponse =
          await api.front.getAdministeredProjectsClubs(contributorId);

        const clubsInfo = processHateoasCollection(
          administeredClubsResponse,
          Club
        );

        dispatch(
          initAdministeredProjectsInfo({
            administeredProjectsInfo: filteredAdministeredProjectsInfo,
            clubsInfo,
          })
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
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contributorId, isCurrentContributor]);

  const loadMembers = async (members) => {
    // ACA cambiar por members y merge data con nuevos attributes!
    doLoad(true);
    try {
      if (members?.length) {
        const memberIds = members.map((m) => m.contributorId);
        const membersResponse = await api.front.getContributors(memberIds);
        const membersData = membersResponse.map((member) => ({
          ...member,
          ...(members.find((m) => m.id === member.contributorId) || {}),
        }));
        dispatch(updateMembersData({ membersData }));
      } else {
        dispatch(updateMembersData({ membersData: [] }));
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
