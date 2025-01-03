import {
  Box,
  TextField,
  Button
} from '@mui/material';
import { useTranslation } from 'next-i18next';

const LearnMore = ({
  formData,
  onFieldChange,
  onSubmit
}) => {
  const { t } = useTranslation('landing');

  return (
    <Box className="LearnMore LearnMore__Container">
      <TextField
        label={t('learnmore.form.fields.source')}
        value={formData['source'] || ''}
        onChange={onFieldChange('source')}
        error={
          // wasSubmitted &&
          true &&
          !formData.source
        }
        fullWidth
      />
      
      <Button
            onClick={onSubmit}
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
            {t('landing.learnmorebutton')}
          </Button>

      {/* <TextField
                  label={
                    formData.referenceName
                      ? t('learnmore.form.fields.source')
                      : t(PRESENTATION_CORE_FIELDS.referenceName.label)
                  }
                  value={formData[PRESENTATION_CORE_FIELDS.referenceName.key] || ''}
                  onChange={onFieldChange(PRESENTATION_CORE_FIELDS.referenceName.key)}
                  error={
                    wasSubmitted &&
                    PRESENTATION_CORE_FIELDS.referenceName.required &&
                    !formData.referenceName
                  }
                  fullWidth
                /> */}
    </Box>
  );
};

LearnMore.defaultProps = {
};

LearnMore.propTypes = {
};

export default LearnMore;
