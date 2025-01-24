import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import Landing from '../components/Landing/Landing';
import LandingLayout from '../layouts/LandingLayout/LandingLayout';

const HomePage = ({ }) => {
  const { t } = useTranslation('landing');

  return (
    <LandingLayout
      headData={{
        title: t('landing.page.title'),
        description: t('landing.page.description'),
      }}
      contained={false}
    >
      <Landing />
    </LandingLayout>
  );
};

HomePage.defaultProps = {
};

HomePage.propTypes = {
};

export const getServerSideProps = async (ctx) => {
  let props = {
    ...(await serverSideTranslations(ctx.locale, [
      'common',
      'landing',
    ])),
  };
  return {
    props,
  };
};

export default HomePage;
