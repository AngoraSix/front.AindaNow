import PropTypes from 'prop-types';
import React from 'react';
import DefaultLayout from '../DefaultLayout';

const ProfileLayout = ({ children, headData }) => {
  return (
    <DefaultLayout
      headData={headData}
      contained={false}
      className="ProfileLayout__Page"
    >
      {children}
    </DefaultLayout>
  );
};

ProfileLayout.defaultProps = {
  headData: {},
};

ProfileLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ProfileLayout;
