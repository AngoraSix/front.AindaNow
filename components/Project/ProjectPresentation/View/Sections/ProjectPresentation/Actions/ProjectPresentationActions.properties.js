export const GENERAL_CLUBS_ACTIONS_KEY = 'general-clubs-actions';

const CONTRIBUTOR_CANDIDATES_TYPE_KEY = 'contributor-candidates';

export const PROJECT_PRESENTATION_SUPPORTED_ACTIONS = {
  SHOW_INTEREST: `${CONTRIBUTOR_CANDIDATES_TYPE_KEY}.addMember`,
  WITHDRAW_INTEREST: `${CONTRIBUTOR_CANDIDATES_TYPE_KEY}.removeMember`,
  REGISTER_ALL_CLUBS: `${GENERAL_CLUBS_ACTIONS_KEY}.registerAll`,
  EDIT: 'updateProjectPresentation',
};
