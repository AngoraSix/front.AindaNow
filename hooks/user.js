import { useSelector } from 'react-redux';

export const useCurrentUser = () => {
  const user = useSelector(({ user }) => user);
  return user;
};
