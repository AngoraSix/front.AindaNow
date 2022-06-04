import EditIcon from '@mui/icons-material/Edit';
import {
  Avatar,
  Box,
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
import React from 'react';
import { resolveRoute, ROUTES } from '../../../../constants';

const AdministeredProjectsSection = ({
  administeredProjects,
  isCurrentContributor,
}) => {
  const router = useRouter();
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
      {administeredProjects.length ? (
        <List className="AdministeredProjects__Listing" dense>
          {administeredProjects.map((project) => (
            <React.Fragment key={project.id}>
              <ListItem
                key={project.id}
                secondaryAction={
                  isCurrentContributor ? (
                    <IconButton
                      onClick={() =>
                        router.push(
                          resolveRoute(ROUTES.projects.edit, project.id)
                        )
                      }
                      edge="end"
                      aria-label="edit"
                    >
                      <EditIcon />
                    </IconButton>
                  ) : undefined
                }
              >
                <ListItemButton
                  onClick={() =>
                    router.push(resolveRoute(ROUTES.projects.view, project.id))
                  }
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
              <Divider />
            </React.Fragment>
          ))}
        </List>
      ) : (
        <Typography>Contributor has no visible administered project</Typography>
      )}
    </Paper>
  );
};

AdministeredProjectsSection.defaultProps = {
  administeredProjects: [],
};

AdministeredProjectsSection.propTypes = {
  administeredProjects: PropTypes.array,
  isCurrentContributor: PropTypes.bool.isRequired,
};

export default AdministeredProjectsSection;
