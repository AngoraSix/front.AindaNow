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
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import config from '../../../../config';
import {
  PROFILE_ATTRIBUTES,
  ROUTES,
} from '../../../../constants';
import { resolveRoute } from '../../../../utils/api/apiHelper';
import ListSkeleton from '../../../common/Skeletons/ListSkeleton.component';

const AdministeredProjectsSection = ({
  administeredProjects,
  selectedClubMembersData,
  loadMembers,
  isCurrentContributor,
}) => {
  const router = useRouter();
  const [selectedClub, setSelectedClub] = useState(null);
  const isLoading = administeredProjects == null;
  const { t } = useTranslation('profile');

  const getAttributeValue = (member, fieldName) => {
    const attributeValue = member[fieldName];
    return Array.isArray(attributeValue) ? attributeValue[0] : attributeValue;
  };

  const getMediaUrl = (member, fieldName) => {
    const media = getAttributeValue(member, fieldName);
    return media?.thumbnailUrl || media?.url;
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
          color="primary"
        >
          {t('profile.administered-projects.title')}
        </Typography>
      </Box>
      {administeredProjects?.length ? (
        <List className="AdministeredProjects__Listing" dense>
          {administeredProjects.map((project) => {
            const contributorCandidatesClub = isCurrentContributor &&
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
                    onClick={(e) => {
                      e.preventDefault();
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
        <Typography>
          {t('profile.administered-projects.empty-message')}
        </Typography>
      )}
      <Dialog
        className="AdministeredProjects__Listing__MembersListing__Dialog"
        onClose={() => onSelectedClub(null)}
        open={!!selectedClub}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle color="primary">
          {t('profile.administered-projects.candidates.title')}
        </DialogTitle>
        <Box className="AdministeredProjects__Listing__MembersListing__Container">
          <List className="AdministeredProjects__Listing__MembersListing__List">
            {selectedClubMembersData ? (
              selectedClubMembersData.length ? (
                selectedClubMembersData.map((member) => {
                  return (
                    <ListItem
                      className="AdministeredProjects__Listing__MembersListing__List__Item"
                      key={member.contributorId}
                      alignItems="flex-start"
                    >
                      <ListItemButton
                        component="span"
                        onClick={(e) => {
                          e.preventDefault();
                          router.push(
                            resolveRoute(
                              ROUTES.profile.view,
                              member.contributorId
                            )
                          );
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            alt="User Profile image"
                            src={getMediaUrl(
                              member,
                              PROFILE_ATTRIBUTES.profilePicture.key
                            )}
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
                                {t(
                                  'profile.administered-projects.candidates.contact'
                                )}
                              </Typography>
                              {`: ${member.data.contact}`}
                            </React.Fragment>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })
              ) : (
                <Box className="AdministeredProjects__Listing__MembersListing__EmptyMessage__Container">
                  <Typography
                    className="AdministeredProjects__Listing__MembersListing__EmptyMessage"
                    align="center"
                  >
                    {t(
                      'profile.administered-projects.candidates.empty-message'
                    )}
                  </Typography>
                </Box>
              )
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
