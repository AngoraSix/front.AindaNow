import React from 'react';
import Menu from './Menu.component';
import { useCurrentUser } from '../../../utils/hooks/user';
import { useCompanies } from '../../../utils/hooks/companies';

const MenuContainer = (props) => {
  const user = useCurrentUser();
  const companies = useCompanies();

  return <Menu user={user} companies={companies} {...props} />;
};

export default MenuContainer;
