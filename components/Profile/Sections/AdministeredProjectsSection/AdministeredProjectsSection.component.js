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
import { resolveRoute, ROUTES } from '../../../../constants';
import ListSkeleton from '../../../common/Skeletons/ListSkeleton.component';

const AdministeredProjectsSection = ({ administeredProjects }) => {
  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState(null);
  const isLoading = administeredProjects == null;
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
          Administered Projects
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
                          onClick={() => setSelectedProject(project)}
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
                        resolveRoute(ROUTES.projects.edit, project.id)
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
      <Dialog onClose={() => setSelectedProject(null)} open={!!selectedProject}>
        <DialogTitle>Contributor Candidates</DialogTitle>
        <Box>
          <List>
            {selectedProject?.clubs?.[
              config.api.servicesAPIParams
                .clubsWellKnownContributorCandidatesType
            ].members.map((member) => {
              console.log(member);
              return (
                <ListItem key={member.contributorId}>
                  <ListItemAvatar>
                    <Avatar>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={member.name} />
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Dialog>
    </Paper>
  );
};

AdministeredProjectsSection.defaultProps = {
  administeredProjects: [],
};

AdministeredProjectsSection.propTypes = {
  administeredProjects: PropTypes.array,
};

export default AdministeredProjectsSection;
