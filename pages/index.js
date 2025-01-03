import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import Landing from '../components/Landing';
import DefaultLayout from '../layouts/DefaultLayout';

const HomePage = ({ }) => {
  const { t } = useTranslation('landing');

  return (
    <DefaultLayout
      headData={{
        title: t('landing.list.page.title'),
        description: t('landing.list.page.description'),
      }}
    >
      <Landing />
    </DefaultLayout>
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
