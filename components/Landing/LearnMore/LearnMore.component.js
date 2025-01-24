import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  MobileStepper,
  Select,
  Slider,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import React from 'react';
import CompletedScreen from './CompletedScreen.component';


const LEARNMORE_FORM_CONTRIBUTE_IMAGE = 'http://34.49.93.68/landing/learnmore/contribute.gif';
const LEARNMORE_FORM_CONTRIBUTE_IMAGE_500 = 'http://34.49.93.68/landing/learnmore/contribute-500.gif';

const LearnMore = ({
  // Step logic
  activeStep,
  totalSteps,
  handleNext,
  handleBack,

  // Step 1 fields
  email,
  setEmail,
  roleOptions,
  role,
  setRole,
  companySize,
  setCompanySize,
  industry,
  setIndustry,
  industryKeys,
  wantsContact,
  setWantsContact,

  // Step 2
  defaultFeatures,
  selectedFeatures,
  toggleFeature,
  newFeature,
  setNewFeature,
  handleAddNewFeature,

  // Step 3
  fairPrice,
  setFairPrice,
  priceMarks,

  // submission
  onSubmit,
  onRefillForm,
  isSubmitted,

  // others
  showEmailError,
  setShowEmailError,
}) => {
  const { t } = useTranslation('landing');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (isSubmitted) {
    return (
      <CompletedScreen wantsContact={wantsContact} onRefillForm={onRefillForm} />
    );
  }

  // Renders the form content for the current step
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (<Box>
          <Box className="LearnMore__Step__Description__Container">
            <Typography className="LearnMore__Step__Description" variant="subtitle2">
              {t(`learnmore.form.step.description.1`)}
            </Typography>
          </Box>
          <Box mb={3}>
            <TextField
              fullWidth
              label={t('learnmore.form.fields.emailorwhapp.label')}
              variant="outlined"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                // If they start typing, we can optionally clear the error:
                if (showEmailError && e.target.value.trim()) {
                  setShowEmailError(false);
                }
              }}
              error={showEmailError} // shows red border if required but empty
              helperText={
                showEmailError
                  ? t('learnmore.form.fields.emailorwhapp.helperText')
                  : ""
              }
            />
            <FormControlLabel
              className='LearnMore__WantsContact__FormControlLabel'
              control={
                <Checkbox
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 23 } }}
                  checked={wantsContact}
                  onChange={(e) => {
                    setWantsContact(e.target.checked);
                    // If the user unchecks, remove the error
                    if (!e.target.checked) {
                      setShowEmailError(false);
                    }
                  }}
                />
              }
              label={t('learnmore.form.fields.wantscontact.label')}
            />
          </Box>
          <Box mb={3}>

          </Box>
          <Box mb={3}>
            <Autocomplete
              freeSolo
              options={roleOptions.map((option) => option.label)}
              value={role}
              onChange={(event, newValue) => {
                // if newValue is an existing option, store it
                setRole(newValue || '');
              }}
              // Called on every keystroke, which captures freeSolo text input
              onInputChange={(event, newInputValue) => {
                setRole(newInputValue || '');
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t('learnmore.form.fields.role.label')}
                  variant="outlined"
                />
              )}
            />
          </Box>
          <Box mb={3}>
            <FormControl fullWidth>
              <InputLabel id="company-size-label">
                {t('learnmore.form.fields.size.selectlabel')}
              </InputLabel>
              <Select
                labelId="company-size-label"
                id="company-size-select"
                value={companySize}
                label={t('learnmore.form.fields.size.selectlabel')}
                onChange={(e) => setCompanySize(e.target.value)}
              >
                {/* The empty value to show a placeholder */}
                <MenuItem value="">
                  <em>{t('learnmore.form.fields.size.selectplaceholder')}</em>
                </MenuItem>
                <MenuItem value="one">
                  {t('learnmore.form.fields.size.one')}
                </MenuItem>
                <MenuItem value="two-five">
                  {t('learnmore.form.fields.size.two-five')}
                </MenuItem>
                <MenuItem value="six-ten">
                  {t('learnmore.form.fields.size.six-ten')}
                </MenuItem>
                <MenuItem value="eleven-fifty">
                  {t('learnmore.form.fields.size.eleven-fifty')}
                </MenuItem>
                <MenuItem value="fiftyone-twohundred">
                  {t('learnmore.form.fields.size.fiftyone-twohundred')}
                </MenuItem>
                <MenuItem value="more">
                  {t('learnmore.form.fields.size.more')}
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box mb={3}>
            <FormControl fullWidth>
              <InputLabel id="industry-label">
                {t('learnmore.form.fields.industry.label')}
              </InputLabel>
              <Select
                className='LearnMore__Industry__Select'
                labelId="industry-label"
                id="industry-select"
                value={industry}
                label={t('learnmore.form.fields.industry.label')}
                onChange={(e) => setIndustry(e.target.value)}
              >
                <MenuItem value="">
                  <em>{t('learnmore.form.fields.industry.placeholder')}</em>
                </MenuItem>

                {industryKeys.map((key) => (
                  <MenuItem key={key} value={key}>
                    {t(key)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              {t('learnmore.form.fields.features.title')}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {t('learnmore.form.fields.features.instructions')}
            </Typography>

            {/* Default feature checkboxes */}
            {defaultFeatures.map((featureKey) => (
              <FormControlLabel
                key={featureKey}
                className='LearnMore__DefaultFeature__FormControlLabel'
                control={
                  <Checkbox
                    checked={selectedFeatures.includes(featureKey)}
                    onChange={() => toggleFeature(featureKey)}
                    sx={{ '& .MuiSvgIcon-root': { fontSize: 23 } }}
                  />
                }
                label={t(featureKey)}
                sx={{ display: 'block', ml: 0 }}
              />
            ))}

            {/* Custom user-added features */}
            {selectedFeatures
              .filter((f) => !defaultFeatures.includes(f)) // only show custom
              .map((customF) => (
                <FormControlLabel
                  key={customF}
                  className='LearnMore__CustomFeature__FormControlLabel'
                  control={
                    <Checkbox
                      checked={selectedFeatures.includes(customF)}
                      onChange={() => toggleFeature(customF)}
                      sx={{ '& .MuiSvgIcon-root': { fontSize: 23 } }}
                    />
                  }
                  label={customF} // user-typed text
                  sx={{ display: 'block', ml: 0 }}
                />
              ))}

            {/* Add new feature textfield + button */}
            <Box display="flex" gap={2} mt={2}>
              <TextField
                className='LearnMore__NewFeature__TextField'
                label={t('learnmore.form.fields.features.newfeature')}
                variant="outlined"
                size="small"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
              />
              <Button variant="contained" onClick={handleAddNewFeature}>
                {t('learnmore.form.fields.features.addButton')}
              </Button>
            </Box>
            <Box className="LearnMore__PricingRange_Container" mb={3}>
              <Typography variant="subtitle2" gutterBottom>
                {t('learnmore.form.fields.pricerange.title')}
              </Typography>
              <Slider
                value={fairPrice !== null ? fairPrice : 0}
                step={1}
                marks={isMobile ? true : priceMarks.map((m) => ({
                  value: m.value,
                  label: t(m.labelKey)
                }))}
                min={0}
                max={5}
                onChangeCommitted={(_, newValue) => {
                  setFairPrice(newValue);
                }}
              />
              {fairPrice === 0 ? (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {t('learnmore.form.fields.pricerange.noselection')}
                </Typography>
              ) : (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {t('learnmore.form.fields.pricerange.selected', {
                    selectedValue: t(
                      priceMarks.find((m) => m.value === fairPrice)?.labelKey
                    )
                  })}
                </Typography>
              )}
            </Box>
          </Box>);
      default:
        return <Box>{'Unknown Step'}</Box>;
    }
  };

  // Renders step navigation depending on desktop vs mobile
  const renderStepper = (stepContent) => {
    const isLastStep = activeStep === totalSteps - 1;
    const isFirstStep = activeStep === 0;
    return isMobile ? (
      <Box>
        <Box className="LearnMore__Stepper__Steps__Container">
          {stepContent}
        </Box>
        <MobileStepper
          variant="text"
          steps={totalSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              variant={isLastStep ? "contained" : "text"}
              size="small"
              onClick={isLastStep ? onSubmit : handleNext}>
              {isLastStep ? t('learnmore.form.submit') : t('learnmore.form.steps.next')}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={isFirstStep}>
              {t('learnmore.form.steps.back')}
            </Button>
          }
        />
      </Box>
    ) : (
      <>
        <Stepper className="LearnMore__Stepper__Desktop" activeStep={activeStep} sx={{ mb: 2 }}>
          {Array.from({ length: totalSteps }).map((_, index) => (
            <Step key={index}>
              <StepLabel>{t(`learnmore.form.steps.${index + 1}`)}</StepLabel>
            </Step>
          ))}
        </Stepper>


        <Box className="LearnMore__Stepper__Steps__Container">
          {stepContent}
        </Box>

        {/* Desktop Next/Back buttons */}
        <Box className="LearnMore__Stepper__Desktop__Actions" mb={2}>
          <Button disabled={isFirstStep} onClick={handleBack}>
            {t('learnmore.form.steps.back')}
          </Button>
          <Button
            variant={isLastStep ? "contained" : "text"}
            onClick={isLastStep ? onSubmit : handleNext}
          >
            {isLastStep ? t('learnmore.form.submit') : t('learnmore.form.steps.next')}
          </Button>
        </Box>


        <Box className="LearnMore__Stepper__Steps__Count">
          <Typography variant='subtitle2'>
            {t(`learnmore.form.steps.count.${activeStep + 1}`)}
          </Typography>
        </Box>
      </>
    );
  };


  return (
    <Box className="LearnMore LearnMore__Container">
      <Box className="LearnMore__Title__Container">
        <Typography variant="h5" className="LearnMore__Title">{t('learnmore.form.title')}</Typography>
      </Box>
      <Box className="LearnMore__Form__Image__Container">
        <Image
          className="LearnMore__Form__Image"
          src={LEARNMORE_FORM_CONTRIBUTE_IMAGE}
          alt="Contribute"
          title="Contribute"
          placeholder="blur"
          blurDataURL={LEARNMORE_FORM_CONTRIBUTE_IMAGE_500}
          sx={{ priority: { xs: false, md: true } }}
          fill
          sizes="(max-width: 1000px) 1000px,
                  // (max-width: 1000px) 1000px,
                  1000px"
        />
      </Box>
      <Box className="LearnMore__ShortText__Container">
        <Typography variant="subtitle1" className="LearnMore__ShortText">
          {t('learnmore.form.shorttext')}
        </Typography>
      </Box>
      {renderStepper(renderStepContent(activeStep))}
    </Box>
  )
};

LearnMore.defaultProps = {
};

LearnMore.propTypes = {
};

export default LearnMore;
