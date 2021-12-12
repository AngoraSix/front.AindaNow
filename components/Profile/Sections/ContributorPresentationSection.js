import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography, Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const ContributorPresentationSection = ({ profile, isCurrentContributor }) => {
  console.log("SSSSS");
  console.log(isCurrentContributor);
  return (
    <Paper className="Presentation">
      <div
        className="Presentation__HeadImageContainer"
        style={{
          backgroundImage:
            'url(https://naldzgraphics.net/wp-content/uploads/2012/06/road-wallpaper.jpg)',
        }}
      >
        <div className="Presentation__ProfileImage">
          <img src={profile.attributes?.picture[0]}></img>
        </div>
      </div>

      <div className="Presentation__ContributorData">
        <Typography
          className="ContributorData__Name"
          variant="h5"
        >{`${profile.firstName} ${profile.lastName}`}</Typography>
      </div>
      {isCurrentContributor && (
        <div className="Presentation__Edit">
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            <EditIcon />
          </Avatar>
        </div>
      )}
    </Paper>
  );
};

ContributorPresentationSection.defaultProps = {};

ContributorPresentationSection.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ContributorPresentationSection;
