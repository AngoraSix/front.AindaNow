import { useSelector } from 'react-redux';

export const useOAuthContext = () => {
  const oauthContext = useSelector(({ oauthContext }) => oauthContext);
  return oauthContext;
};
