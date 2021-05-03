import { useSelector } from 'react-redux';

export const useCompanies = () => {
  const companies = useSelector(({ companies }) => companies);
  return companies;
};
