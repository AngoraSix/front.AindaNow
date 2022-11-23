import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import {
  Box,
  Button,
  MobileStepper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { useNotifications } from '../../../../hooks/app';
import logger from '../../../../utils/logger';
import ProjectCoreData from '../Sections/ProjectCoreData.component';
import ProjectPresentationData from '../Sections/ProjectPresentationData.component';
import ProjectPresentationMedia from '../Sections/ProjectPresentationMedia.component';
import ProjectPresentationParams from '../Sections/ProjectPresentationParams.component';

const steps = [
  {
    label: 'projects.edit.form.steps.step.core.title',
    component: ProjectCoreData,
    optional: false,
  },
  {
    label: 'projects.edit.form.steps.step.presentation.title',
    component: ProjectPresentationData,
    optional: true,
  },
  {
    label: 'projects.edit.form.steps.step.media.title',
    component: ProjectPresentationMedia,
    optional: false,
  },
  {
    label: 'projects.edit.form.steps.step.params.title',
    component: ProjectPresentationParams,
    optional: true,
  },
];

const SteppedProjectForm = ({ formData, onFormChange }) => {
  const { t } = useTranslation('projects.edit');
  const { onError } = useNotifications();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [completed, setCompleted] = useState(new Set());
  const [stepWasSubmitted, setStepWasSubmitted] = useState(false);
  const submitInputRef = useRef();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const setCompletedStep = (isCompleted) => {
    const newCompleted = new Set(completed.values());
    isCompleted
      ? newCompleted.add(activeStep)
      : newCompleted.delete(activeStep);
    setCompleted(newCompleted);
  };

  const isStepCompleted = (step = activeStep) => {
    return completed.has(step);
  };

  const isStepOptional = (step) => {
    return steps[step].optional;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = (e) => {
    e?.preventDefault();
    if (!isStepCompleted() && !isStepOptional(activeStep)) {
      setStepWasSubmitted(true);
      return;
    }
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setStepWasSubmitted(false);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = (e) => {
    e.preventDefault();
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = (e) => {
    e.preventDefault();
    if (!isStepOptional(activeStep)) {
      const errorMessage = "You can't skip a step that isn't optional.";
      onError(message);
      logger.error(errorMessage, `Active step: ${activeStep}`);
    }

    setStepWasSubmitted(false);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const ActiveComponent = steps[activeStep].component;
  const isLastStep = activeStep === steps.length - 1;

  const onInputKeyPressed = (e) => {
    if (e.key === 'Enter') {
      isLastStep ? submitInputRef.current.click() : handleNext(e);
    }
  };

  return (
    <Box
      sx={{ width: '100%' }}
      className={`SteppedProjectForm SteppedProjectForm__Section__Container`}
    >
      {isMobile ? (
        <MobileStepper
          className="NewProject__MobileStepper"
          variant="dots"
          steps={steps.length}
          position="static"
          activeStep={activeStep}
          sx={{ maxWidth: 400, flexGrow: 1 }}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep >= steps.length - 1}
            >
              {t('projects.edit.form.steps.next')}
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              {t('projects.edit.form.steps.back')}
            </Button>
          }
        />
      ) : (
        <Stepper className="NewProject__Stepper" activeStep={activeStep}>
          {steps.map((step, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography fontSize="0.9rem" variant="caption">
                  {t('projects.edit.form.steps.optional')}
                </Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={step.label} {...stepProps}>
                <StepLabel {...labelProps}>{t(step.label)}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      )}
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - shouldn't reach this point
          </Typography>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <ActiveComponent
            formData={formData}
            onFormChange={onFormChange}
            withDescription
            isMobile={isMobile}
            setIsCompleted={setCompletedStep}
            wasSubmitted={stepWasSubmitted}
            onInputKeyPressed={onInputKeyPressed}
          />
          {isMobile ? (
            <Box className="SteppedProjectForm__Actions">
              {isLastStep && (
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  ref={submitInputRef}
                >
                  {t('projects.edit.form.steps.finish')}
                </Button>
              )}
            </Box>
          ) : (
            <Box className="SteppedProjectForm__Actions">
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                {t('projects.edit.form.steps.back')}
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {isStepOptional(activeStep) && !isLastStep && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  {t('projects.edit.form.steps.skip')}
                </Button>
              )}

              {isLastStep ? (
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  ref={submitInputRef}
                >
                  {t('projects.edit.form.steps.finish')}
                </Button>
              ) : (
                <Button onClick={handleNext}>
                  {t('projects.edit.form.steps.next')}
                </Button>
              )}
            </Box>
          )}
        </React.Fragment>
      )}
    </Box>
  );
};

SteppedProjectForm.defaultProps = {
  className: '',
};

SteppedProjectForm.propTypes = {
  formData: PropTypes.object.isRequired,
  onFormChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default SteppedProjectForm;
