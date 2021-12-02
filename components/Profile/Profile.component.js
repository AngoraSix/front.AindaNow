import { Paper, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const Profile = ({ profile }) => {
  return (
    <div className="Profile Profile__Container">
      <Paper className="Presentation">
        <div
          className="Presentation__HeadImageContainer"
          style={{
            backgroundImage:
              'url(https://naldzgraphics.net/wp-content/uploads/2012/06/road-wallpaper.jpg)',
          }}
        >
          <div className="Presentation__ProfileImage">
            <img src={profile?.attributes?.picture[0]}></img>
          </div>
        </div>

        <div className="Presentation__ContributorData">
          <Typography
            className="ContributorData__Name"
            variant="h5"
          >{`${profile?.firstName} ${profile?.lastName}`}</Typography>
        </div>
      </Paper>
    </div>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default Profile;
