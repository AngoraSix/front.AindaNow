import { Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const FEATURE_EFFORT_TRACKING_IMAGE = 'http://34.49.93.68/landing/features/efforttracking.gif';
const FEATURE_EFFORT_TRACKING_IMAGE_500 = 'http://34.49.93.68/landing/features/efforttracking-500.gif';
const FEATURE_GOVERNANCE_IMAGE = 'http://34.49.93.68/landing/features/governance.gif';
const FEATURE_GOVERNANCE_IMAGE_500 = 'http://34.49.93.68/landing/features/governance-500.gif';
const FEATURE_FIND_CONTRIBUTORS_IMAGE = 'http://34.49.93.68/landing/features/findcontributors.gif';
const FEATURE_FIND_CONTRIBUTORS_IMAGE_500 = 'http://34.49.93.68/landing/features/findcontributors-500.gif';

const Lanading = ({ }) => {
  const { t } = useTranslation('landing');

  return (
    <Box className="Lanading Lanading__Container">
      <Box className="Landing__Title__Container">
        <Typography variant="h5" className="Lanading__Title">{t('landing.page.title')}</Typography>
      </Box>
      <Box className="Feature__Container">
        <Box className="Landing__Feature__Image__Container">
          <Image
            className="Landing__Feature__Image"
            src={FEATURE_EFFORT_TRACKING_IMAGE}
            alt="Effort Tracking Feature"
            title="Effort Tracking Feature"
            placeholder="blur"
            blurDataURL={FEATURE_EFFORT_TRACKING_IMAGE_500}
            sx={{ priority: { xs: false, md: true } }}
            fill
            sizes="(max-width: 500px) 500px,
          // (max-width: 500px) 500px,
          500px"
          />
        </Box>
        <Box className="Landing__Feature__Text__Container">
          <Typography variant="subtitle1"
            className="Lanading__Feature__Title">{t('landing.features.efforttracking.title')}</Typography>
          <Typography variant="caption" className="Lanading__Feature__Description">{t('landing.features.efforttracking.text')}</Typography>
        </Box>
      </Box>
      <Box className="Feature__Container">
        <Box className="Landing__Feature__Image__Container">
          <Image
            className="Landing__Feature__Image"
            src={FEATURE_GOVERNANCE_IMAGE}
            alt="Effort Tracking Feature"
            title="Effort Tracking Feature"
            placeholder="blur"
            blurDataURL={FEATURE_GOVERNANCE_IMAGE_500}
            sx={{ priority: { xs: false, md: true } }}
            fill
            sizes="(max-width: 500px) 500px,
          // (max-width: 500px) 500px,
          500px"
          />
        </Box>
        <Box className="Landing__Feature__Text__Container">
          <Typography variant="subtitle1"
            className="Lanading__Feature__Title">{t('landing.features.governance.title')}</Typography>
          <Typography variant="caption" className="Lanading__Feature__Description">{t('landing.features.governance.text')}</Typography>
        </Box>
      </Box>
      <Box className="Feature__Container">
        <Box className="Landing__Feature__Image__Container">
          <Image
            className="Landing__Feature__Image"
            src={FEATURE_FIND_CONTRIBUTORS_IMAGE}
            alt="Effort Tracking Feature"
            title="Effort Tracking Feature"
            placeholder="blur"
            blurDataURL={FEATURE_FIND_CONTRIBUTORS_IMAGE_500}
            sx={{ priority: { xs: false, md: true } }}
            fill
            sizes="(max-width: 500px) 500px,
          // (max-width: 500px) 500px,
          500px"
          />
        </Box>
        <Box className="Landing__Feature__Text__Container">
          <Typography variant="subtitle1"
            className="Lanading__Feature__Title">{t('landing.features.findcontributors.title')}</Typography>
          <Typography variant="caption" className="Lanading__Feature__Description">{t('landing.features.findcontributors.text')}</Typography>
        </Box>
      </Box>
      <Box className="LearnMoreButton_Container">
        <Link href={"/learn-more"}>
          <Button
            variant="contained"
            fullWidth
          >
            {t('landing.learnmorebutton')}
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

Lanading.defaultProps = {};

Lanading.propTypes = {
};

export default Lanading;
