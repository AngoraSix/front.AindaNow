import config from "../../../../../../../config";

export const GENERAL_CLUBS_ACTIONS_KEY = 'general-clubs-actions';

export const PROJECT_PRESENTATION_SUPPORTED_ACTIONS = {
  SHOW_INTEREST: `${config.api.servicesAPIParams.clubsWellKnownContributorCandidatesType}.addMemberForProject`,
  WITHDRAW_INTEREST: `${config.api.servicesAPIParams.clubsWellKnownContributorCandidatesType}.removeMemberForProject`,
  REGISTER_ALL_CLUBS: `${GENERAL_CLUBS_ACTIONS_KEY}.registerAllForProject`,
  EDIT: 'updateProjectPresentation',
};
