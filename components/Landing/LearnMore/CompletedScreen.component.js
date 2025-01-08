import {
  Box,
  Button,
  Typography
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import React from 'react';


const LEARNMORE_FORM_COMPLETED_IMAGE = 'http://34.49.93.68/landing/learnmore/completed.gif';
const LEARNMORE_FORM_COMPLETED_IMAGE_500 = 'http://34.49.93.68/landing/learnmore/completed-500.gif';

const CompletedScreen = ({ wantsContact, onRefillForm }) => {
  const { t } = useTranslation('landing');

  return (
    <Box className="LearnMoreCompletedScreen__Container">
      <Box className="LearnMoreCompletedScreen__Image__Container">
        <Image
          className="LearnMoreCompletedScreen__Image"
          src={LEARNMORE_FORM_COMPLETED_IMAGE}
          alt="Completed"
          title="Completed"
          placeholder="blur"
          blurDataURL={LEARNMORE_FORM_COMPLETED_IMAGE_500}
          sx={{ priority: { xs: false, md: true } }}
          fill
          sizes="(max-width: 1000px) 1000px,
                        // (max-width: 1000px) 1000px,
                        1000px"
        />
      </Box>
      <Typography className='LearnMoreCompletedScreen__ShortText' variant="subtitle1">
        {wantsContact
          ? t('learnmore.completed.shorttext.contact')
          : t('learnmore.completed.shorttext.nocontact')}
      </Typography>

      <Typography className='LearnMoreCompletedScreen__FillAgain__Text' variant="subtitle2">
        {t('learnmore.completed.fillagain.text')}
      </Typography>

      <Button variant="contained" onClick={onRefillForm}>
        {t('learnmore.completed.fillagain.label')}
      </Button>
    </Box>
  );
}

CompletedScreen.defaultProps = {
};

CompletedScreen.propTypes = {
};

export default CompletedScreen;
