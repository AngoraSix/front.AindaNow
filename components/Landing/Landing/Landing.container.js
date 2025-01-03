import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';
import { useLoading, useNotifications } from '../../../hooks/app';
import Lanading from './Landing.component';

const LanadingContainer = ({ }) => {
  const { t } = useTranslation('landing');
  const router = useRouter();
  const { doLoad } = useLoading();
  const { onSuccess, onError } = useNotifications();


  return (
    <Lanading />
  );
};

LanadingContainer.defaultProps = {};

LanadingContainer.propTypes = {
};

export default LanadingContainer;
