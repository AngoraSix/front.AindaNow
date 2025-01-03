import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import api from '../../../api';
import { useLoading, useNotifications } from '../../../hooks/app';
import logger from '../../../utils/logger';
import LearnMore from './LearnMore.component';
import { LEARN_MORE_CONSTANTS } from './LearnMore.properties';

const LearnMoreContainer = ({
}) => {
  const [formData, setFormData] = useState({});

  const { t } = useTranslation('landing');

  const { onError, onSuccess } = useNotifications();
  const { doLoad } = useLoading();

  const onFieldChange = (property) => (eventOrValue) => {
    const partialFormData = {
      [property]: eventOrValue.target
        ? eventOrValue.target.value
        : eventOrValue,
    };

    setFormData({ ...formData, ...partialFormData });
  };

  const onSubmit = async () => {
    doLoad(true);
    try {
      const surveyResponseResponse = await api.front.saveSurveyResponse(
        formData,
        LEARN_MORE_CONSTANTS.LS1_EXPERIMENT_KEY
      );

      onSuccess(t('learnmore.save.success'));
    } catch (err) {
      logger.error(err);
      onError(t('learnmore.save.error'));
    }

    doLoad(false);
  };

  return (
    <LearnMore
      formData={formData}
      onFieldChange={onFieldChange}
      onSubmit={onSubmit}
    />
  );
};

LearnMoreContainer.defaultProps = {
};
LearnMoreContainer.propTypes = {
};

export default LearnMoreContainer;
