import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
} from '@mui/material';
import ProjectCoreData from '../Sections/ProjectCoreData.component';
import ProjectPresentationData from '../Sections/ProjectPresentationData.component';
import { useNotifications } from '../../../../hooks/app';
import logger from '../../../../utils/logger';

const steps = [
  {
    label: 'Name your project',
    component: ProjectCoreData,
  },
  { label: 'Work on the presentation', component: ProjectPresentationData },
];

const SteppedProjectForm = ({ formData, onFormChange, className }) => {
  const { onError } = useNotifications();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      const errorMessage = "You can't skip a step that isn't optional.";
      onError(message);
      logger.error(errorMessage, `Active step: ${activeStep}`);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const ActiveComponent = steps[activeStep].component;

  return (
    <Box
      sx={{ width: '100%' }}
      className={`SteppedProjectForm SteppedProjectForm__Container ${className}`}
    >
      <Stepper className="NewProject__Stepper" activeStep={activeStep}>
        {steps.map((step, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={step.label} {...stepProps}>
              <StepLabel {...labelProps}>{step.label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
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
          />
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            {activeStep === steps.length - 1 ? (
              <Button
                type="submit"
                color="primary"
                variant="contained"
              >
                Finish
              </Button>
            ) : (
              <Button onClick={handleNext}>Next</Button>
            )}
          </Box>
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
