import GroupsIcon from '@mui/icons-material/Groups';
import {
  Avatar,
  Badge,
  Box,
  Dialog,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import config from '../../../../config';
import {
  PROFILE_ATTRIBUTES,
  resolveRoute,
  ROUTES,
} from '../../../../constants';
import ListSkeleton from '../../../common/Skeletons/ListSkeleton.component';
import { useTranslation } from 'next-i18next';

const AdministeredProjectsSection = ({
  administeredProjects,
  selectedClubMembersData,
  loadMembers,
  isCurrentContributor,
}) => {
  const router = useRouter();
  const [selectedClub, setSelectedClub] = useState(null);
  const isLoading = administeredProjects == null;
  const { t } = useTranslation('common');

  const getAttributeValue = (member, fieldName) => {
    const attributeValue = member.attributes[fieldName];
    return Array.isArray(attributeValue) ? attributeValue[0] : attributeValue;
  };

  const onSelectedClub = (club) => {
    setSelectedClub(club);
    loadMembers(club?.members);
  };

  return (
    <Paper className="AdministeredProjects Profile__Section">
      <Box className="AdministeredProjects__Heading">
        <Typography
          className="AdministeredProjects__Heading__Title"
          align="center"
          variant="h6"
          component="h2"
          color="primary.main"
        >
          {t('profile.administered-projects')}
        </Typography>
      </Box>
      {administeredProjects?.length ? (
        <List className="AdministeredProjects__Listing" dense>
          {administeredProjects.map((project) => {
            const contributorCandidatesClub =
              project.clubs?.[
                config.api.servicesAPIParams
                  .clubsWellKnownContributorCandidatesType
              ];
            return (
              <React.Fragment key={project.id}>
                <ListItem
                  className="AdministeredProjects__Listing__Item"
                  key={project.id}
                  secondaryAction={
                    contributorCandidatesClub ? (
                      <Badge
                        badgeContent={contributorCandidatesClub.members.length}
                        color="primary"
                      >
                        <IconButton
                          onClick={() =>
                            onSelectedClub(contributorCandidatesClub)
                          }
                          edge="end"
                          aria-label="candidates"
                        >
                          <GroupsIcon />
                        </IconButton>
                      </Badge>
                    ) : undefined
                  }
                >
                  <ListItemButton
                    onClick={() => {
                      router.push(
                        resolveRoute(
                          isCurrentContributor
                            ? ROUTES.projects.edit
                            : ROUTES.projects.view,
                          project.id
                        )
                      );
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt={`Project ${project.name}`}
                        src={
                          project.presentations?.[0]?.sections?.[0]?.mainMedia
                            .thumbnailUrl
                        }
                      />
                    </ListItemAvatar>
                    <ListItemText
                      className="AdministeredProjects__Listing__Title"
                      primary={project.name}
                    />
                  </ListItemButton>
                </ListItem>
                <Divider variant="middle" />
              </React.Fragment>
            );
          })}
        </List>
      ) : isLoading ? (
        <Box className="AdministeredProjects__Listing">
          <ListSkeleton />
        </Box>
      ) : (
        <Typography>Contributor has no visible administered project</Typography>
      )}
      <Dialog
        onClose={() => onSelectedClub(null)}
        open={!!selectedClub}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle color="primary.main">Contributor Candidates</DialogTitle>
        <Box>
          <List>
            {selectedClubMembersData?.length ? (
              selectedClubMembersData.map((member) => {
                return (
                  <ListItem key={member.contributorId} alignItems="flex-start">
                    <ListItemButton
                      component="a"
                      href={`/profile/${member.contributorId}`}
                    >
                      <ListItemAvatar>
                        <Avatar
                          alt="User Profile image"
                          src={
                            getAttributeValue(
                              member,
                              PROFILE_ATTRIBUTES.profilePictureThumbnail.key
                            ) ||
                            getAttributeValue(
                              member,
                              PROFILE_ATTRIBUTES.profilePicture.key
                            )
                          }
                          sx={{ width: 50, height: 50 }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${member.firstName} ${member.lastName}`}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              Contact
                            </Typography>
                            {` - ${member.data.contact}`}
                          </React.Fragment>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })
            ) : (
              <ListSkeleton />
            )}
          </List>
        </Box>
      </Dialog>
    </Paper>
  );
};

AdministeredProjectsSection.defaultProps = {
  administeredProjects: [],
  isCurrentContributor: false,
};

AdministeredProjectsSection.propTypes = {
  administeredProjects: PropTypes.array,
  loadMembers: PropTypes.func.isRequired,
  selectedClubMembersData: PropTypes.array,
  isCurrentContributor: PropTypes.bool,
};

export default AdministeredProjectsSection;
