import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableFeatureItem from './DraggableFeatureItem';
import { LEARN_MORE_CONSTANTS } from './LearnMore.properties';

const LearnMore = ({
  // formData,
  // onFieldChange,
  email,
  setEmail,
  role,
  setRole,
  roleOptions,
  companySize,
  setCompanySize,
  biggestChallenge,
  setBiggestChallenge,
  features,
  moveFeature,
  removeFeature,
  newFeature,
  setNewFeature,
  handleAddFeature,
  onSubmit
}) => {
  const { t } = useTranslation('landing');

  return (
    <DndProvider backend={HTML5Backend}>
      <Box className="LearnMore LearnMore__Container">
        <Box component="form" onSubmit={onSubmit}>
          {/* 1) Role (Autocomplete, freeSolo) */}
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

          {/* 3) Company Size (Select with translated labels) */}
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


          {/* 3) Email */}
          <Box mb={3}>
            <TextField
              fullWidth
              label={t('learnmore.form.fields.emailorwhapp.label')}
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>

          {/* 4) Feature Priority (Drag-and-Drop) */}
          <Box>
            <Typography variant="h6" gutterBottom>
              {t('learnmore.form.fields.features.title')}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {t('learnmore.form.fields.features.instructions')}
            </Typography>
          </Box>

          <Box mb={2}>
            {features.map((feature, index) => (
              <DraggableFeatureItem
                key={feature.id}
                feature={feature}
                index={index}
                moveFeature={moveFeature}
                removeFeature={removeFeature}
                itemType={LEARN_MORE_CONSTANTS.DND_ITEM_TYPE}
                featuresCount={features.length}
              />
            ))}
          </Box>

          {/* Add New Feature */}
          <Box display="flex" gap={2} mb={3}>
            <TextField
              label={t('learnmore.form.fields.features.newfeature')}
              variant="outlined"
              size="small"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
            />
            <Button variant="contained" onClick={handleAddFeature}>
              {t('learnmore.form.fields.features.addButton')}
            </Button>
          </Box>

          {/* 5) Biggest Challenge */}
          <Box mb={3}>
            <TextField
              fullWidth
              label={t('learnmore.form.fields.challenge.label')}
              multiline
              rows={3}
              variant="outlined"
              value={biggestChallenge}
              onChange={(e) => setBiggestChallenge(e.target.value)}
            />
          </Box>

          <Button
            // onClick={onSubmit}
            type='submit'
            //   if (Object.values(completedSections).some((v) => !v)) {
            //     setFormWasSubmitted(true);
            //     event.preventDefault();
            //   }
            // }}
            // type="submit"
            color="primary"
            variant="contained"
            fullWidth
          >
            {t('learnmore.form.submit')}
          </Button>
        </Box>
      </Box>
    </DndProvider>
  )
};

LearnMore.defaultProps = {
};

LearnMore.propTypes = {
};

export default LearnMore;
