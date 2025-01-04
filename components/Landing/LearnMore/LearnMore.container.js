import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import api from '../../../api';
import config from '../../../config';
import { useLoading, useNotifications } from '../../../hooks/app';
import logger from '../../../utils/logger';
import LearnMore from './LearnMore.component';
import { LEARN_MORE_CONSTANTS } from './LearnMore.properties';

const LearnMoreContainer = ({
}) => {
  // const [formData, setFormData] = useState({});

  const { t } = useTranslation('landing');

  const { onError, onSuccess } = useNotifications();
  const { doLoad } = useLoading();

  // Basic form fields
  const [uniqueId, setUniqueId] = useState(10000);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [biggestChallenge, setBiggestChallenge] = useState('');
  const [features, setFeatures] = useState([
    { id: 1, labelKey: 'learnmore.form.fields.features.efforttracking' },
    { id: 2, labelKey: 'learnmore.form.fields.features.transparency' },
    { id: 3, labelKey: 'learnmore.form.fields.features.memberengagement' },
  ]);
  const [newFeature, setNewFeature] = useState('');

  // Predefined suggestions in Spanish. Could replace with t('common:roles.xxx').
  const roleOptions = [
    { label: t('learnmore.form.fields.roles.admin') },
    { label: t('learnmore.form.fields.roles.ceo') },
    { label: t('learnmore.form.fields.roles.collaborator') },
    { label: t('learnmore.form.fields.roles.externaladvisor') },
  ];

  // Move feature in the array
  const moveFeature = (fromIndex, toIndex) => {
    setFeatures((prev) => {
      const updated = [...prev];
      const [movedItem] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, movedItem);
      return updated;
    });
  };

  // Add new feature
  const handleAddFeature = () => {
    if (!newFeature.trim()) return;
    setFeatures((prev) => [
      ...prev,
      { id: uniqueId + 1, labelKey: newFeature.trim() },
    ]);
    setUniqueId((prev) => prev + 1);
    setNewFeature('');
  };

  // Remove a feature
  const removeFeature = (featureId) => {
    setFeatures((prev) => prev.filter((f) => f.id !== featureId));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    doLoad(true);
    try {
      const grecaptchaToken = await grecaptcha.execute(
        config.thirdParties.googleRecaptcha.key,
        { action: LEARN_MORE_CONSTANTS.LS1_EXPERIMENT_CAPTCHA_ACTION_KEY }
      );
      // Gather all data
      const formData = {
        grecaptchaToken,
        email,
        role,
        companySize,
        biggestChallenge,
        featurePriorities: features.map((f) => f.label),
        // Possibly also ask for email, or any other fields
      };

      console.log('Survey Data:', formData);

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
      // formData={formData}
      // onFieldChange={onFieldChange}
      // onSubmit={onSubmit}

      email={email}
      setEmail={setEmail}
      role={role}
      setRole={setRole}
      roleOptions={roleOptions}
      companySize={companySize}
      setCompanySize={setCompanySize}
      biggestChallenge={biggestChallenge}
      setBiggestChallenge={setBiggestChallenge}
      features={features}
      moveFeature={moveFeature}
      removeFeature={removeFeature}
      newFeature={newFeature}
      setNewFeature={setNewFeature}
      handleAddFeature={handleAddFeature}
      onSubmit={onSubmit}
    />
  );
};

LearnMoreContainer.defaultProps = {
};
LearnMoreContainer.propTypes = {
};

export default LearnMoreContainer;
