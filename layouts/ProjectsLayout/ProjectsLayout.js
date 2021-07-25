import PropTypes from 'prop-types';
import React from 'react';
import DefaultLayout from '../DefaultLayout';

const ProjectsLayout = ({ children }) => {
  // const { query } = useRouter();

  let headData = {};
  // if (company) {
  //   headData = {
  //     title: `${company.name} - AngoraSix`,
  //     description: `Todos los vehículos de ${company.name}`,
  //   };
  //   if (!!company.images && !!company.images.length)
  //     headData.image = { logo: company.images[0] };
  // }

  return <DefaultLayout headData={headData}>{children}</DefaultLayout>;
};

ProjectsLayout.defaultProps = {};

ProjectsLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ProjectsLayout;
