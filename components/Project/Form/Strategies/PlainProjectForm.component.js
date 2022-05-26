import { Box, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import ProjectPresentationForm from '../../ProjectPresentation/Form';
import ProjectCorePresentationsHolder from '../Sections/Previews/ProjectPresentationsHolder.component';
import ProjectCoreData from '../Sections/ProjectCoreData.component';

const PlainProjectForm = ({ formData, onFormChange, project }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();
  const editingPresentationId = router.query.editingPresentationId;
  const editingPresentationObject = project.presentations?.find(
    (pr) => pr.id === editingPresentationId
  );

  return (
    <Box className={`PlainProjectForm PlainProjectForm__Section__Container`}>
      <Box className="ProjectForm__PlainForm__Section">
        <Typography
          className="ProjectForm__PlainForm__Section__Title"
          variant="subtitle1"
          color="primary"
        >
          Project Name
        </Typography>
        <ProjectCoreData
          formData={formData}
          onFormChange={onFormChange}
          isMobile={isMobile}
        />
      </Box>
      <Box className="ProjectForm__PlainForm__Section">
        <Typography
          className="ProjectForm__PlainForm__Section__Title"
          variant="subtitle1"
          color="primary"
        >
          Presentations
        </Typography>
        <ProjectCorePresentationsHolder
          project={project}
          formData={formData}
          isMobile={isMobile}
        />
      </Box>
      <Box className="ProjectForm__PlainForm__Section">
        <Button type="submit" color="primary" variant="contained" fullWidth>
          Save
        </Button>
      </Box>
      {editingPresentationObject && (
        <ProjectPresentationForm
          projectPresentation={editingPresentationObject}
          project={project}
          isTriggeredAction={true}
        />
      )}
    </Box>
  );
};

PlainProjectForm.defaultProps = {
  className: '',
  project: {},
};

PlainProjectForm.propTypes = {
  formData: PropTypes.object.isRequired,
  project: PropTypes.object,
  onFormChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default PlainProjectForm;
