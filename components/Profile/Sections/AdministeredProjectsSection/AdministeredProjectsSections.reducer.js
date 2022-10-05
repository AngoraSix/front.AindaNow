const INIT_ADMINISTERED_PROJECTS =
  'AdministeredProjectsSections/INIT_ADMINISTERED_PROJECTS';

const UPDATE_MEMBERS_DATA = 'AdministeredProjectsSections/UPDATE_MEMBERS_DATA';

export const initAdministeredProjectsInfo = (payload) => ({
  type: INIT_ADMINISTERED_PROJECTS,
  payload,
});

export const updateMembersData = (payload) => ({
  type: UPDATE_MEMBERS_DATA,
  payload,
});

export const INITIAL_STATE = {
  administeredProjects: null,
  membersData: null,
};

const AdministeredProjectsSectionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INIT_ADMINISTERED_PROJECTS:
      const clubsInfo = action.payload.clubsInfo;
      const administeredProjectsInfo =
        action.payload.administeredProjectsInfo.map((pr) => {
          pr.clubs = Object.assign(
            {},
            ...clubsInfo
              .filter((c) => c.projectId === pr.id)
              .map((c) => ({ [c.type]: c }))
          );
          return pr;
        });
      return {
        ...state,
        administeredProjects: administeredProjectsInfo,
      };
    case UPDATE_MEMBERS_DATA:
      const membersData = action.payload.membersData;
      return {
        ...state,
        membersData,
      };
    default:
      return state;
  }
};

export default AdministeredProjectsSectionsReducer;
