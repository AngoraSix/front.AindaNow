import { Box, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React from 'react';

const LandingFooter = ({ }) => {
  const { t } = useTranslation('landing');

  return (
    <Box className="LandingFooter LandingFooter__Container">
      <Typography variant="caption" className="LandingFooter__PoweredBy">
        {t('landing.footer.poweredby')}
      </Typography>
      <Typography variant="caption" className="LandingFooter__Contact">
        {t('landing.footer.contact')}
      </Typography>
    </Box>
  );
};

LandingFooter.defaultProps = {};

LandingFooter.propTypes = {
};

export default LandingFooter;
