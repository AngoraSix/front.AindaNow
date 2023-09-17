import { Box, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ProjectPresentationForm from '../../ProjectPresentation/Form';
import ProjectCorePresentationsHolder from '../Sections/Previews/ProjectPresentationsHolder.component';
import ProjectCoreData from '../Sections/ProjectCoreData.component';
import { getParamsFromRelativeUri } from '../../../../utils/helpers';

const REQUIRED_SECTIONS = {
  CORE: 'CORE',
};

const PlainProjectForm = ({ formData, onFormChange, project }) => {
  const { t } = useTranslation('projects.edit');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();
  const [formWasSubmitted, setFormWasSubmitted] = useState(false);
  const [completedSections, setCompletedSections] = useState({
    [REQUIRED_SECTIONS.CORE]: false,
  });
  const [editingPresentationId, setEditingPresentationId] = useState(
    router.query.editingPresentationId
  );
  const [editingPresentationObject, setEditingPresentationObject] = useState(
    project.presentations?.find((pr) => pr.id === editingPresentationId)
  );

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      if (shallow) {
        const newUrlParams = getParamsFromRelativeUri(url);
        const editingPresentationId = newUrlParams.get('editingPresentationId');

        setEditingPresentationId(editingPresentationId);
        setEditingPresentationObject(
          project.presentations?.find((pr) => pr.id === editingPresentationId)
        );
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router, project.presentations]);

  const updateCompletedStatus = (section) => (isCompleted) => {
    setCompletedSections({ ...completedSections, [section]: isCompleted });
  };

  return (
    <Box className={`PlainProjectForm PlainProjectForm__Section__Container`}>
      <Box className="ProjectForm__PlainForm__Section">
        <Typography
          className="ProjectForm__PlainForm__Section__Title"
          variant="subtitle1"
          color="primary"
        >
          {t('projects.edit.form.fields.project-name')}
        </Typography>
        <ProjectCoreData
          formData={formData}
          onFormChange={onFormChange}
          isMobile={isMobile}
          setIsCompleted={updateCompletedStatus(REQUIRED_SECTIONS.CORE)}
          wasSubmitted={formWasSubmitted}
        />
      </Box>
      <Box className="ProjectForm__PlainForm__Section">
        <Typography
          className="ProjectForm__PlainForm__Section__Title"
          variant="subtitle1"
          color="primary"
        >
          {t('projects.edit.form.fields.presentations')}
        </Typography>
        <ProjectCorePresentationsHolder
          project={project}
          formData={formData}
          isMobile={isMobile}
        />
      </Box>
      <Box className="ProjectForm__PlainForm__Section">
        <Button
          onClick={(event) => {
            if (Object.values(completedSections).some((v) => !v)) {
              setFormWasSubmitted(true);
              event.preventDefault();
            }
          }}
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
        >
          {t('projects.edit.form.simple.commands.save')}
        </Button>
      </Box>
      {(editingPresentationObject || editingPresentationId != null) && (
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
