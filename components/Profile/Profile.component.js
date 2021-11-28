import PropTypes from 'prop-types';
import React from 'react';

const Profile = ({ profile }) => {
  console.log("GERGERGER");
  console.log(profile);
  return (
    <div className="Profile Profile__Container">
      <div className="Profile__ContributorData">
        <div className="Profile__ContributorData__Image">
          <img src={profile?.attributes?.picture[0]}></img>
        </div>
        <div className="Profile__ContributorData__Name">{profile?.username}</div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default Profile;
