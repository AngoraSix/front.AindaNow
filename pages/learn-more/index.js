import { getSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import LearnMore from '../../components/Landing/LearnMore';
import LandingLayout from '../../layouts/LandingLayout';
import logger from '../../utils/logger';

const LearnMorePage = ({ surveysListResponseData, session }) => {
  const { t } = useTranslation('landing');
  // useActiveSession();

  // if (!session || session.error) {
  //   logger.error('Log in to learn more');
  //   return (
  //     <DefaultLayout>
  //       <Box>
  //         <FormSkeleton />
  //       </Box>
  //     </DefaultLayout>
  //   );
  // }
  return (
    <LandingLayout
      headData={{
        title: t('learnmore.page.title'),
        description: t('learnmore.page.description'),
      }}
      contained={true}
    >
      <LearnMore />
    </LandingLayout>
  );
};

LearnMorePage.defaultProps = {};

LearnMorePage.propTypes = {
};

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  let props = {
    ...(await serverSideTranslations(ctx.locale, [
      'common',
      'landing',
    ])),
  };

  try {
    const validatedToken =
      session?.error !== 'RefreshAccessTokenError' ? session : null;
    const surveysList = []
    // await api.surveys.fetchSurveys(
    //   validatedToken
    // );
    props = {
      ...props,
      surveysList,
    };
  } catch (err) {
    logger.error('err', err);
  }
  return {
    props,
  };
};

export default LearnMorePage;
