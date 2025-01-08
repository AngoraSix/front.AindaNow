import Cookies from 'js-cookie';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import api from '../../../api';
import config from '../../../config';
import { useLoading, useNotifications } from '../../../hooks/app';
import logger from '../../../utils/logger';
import LearnMore from './LearnMore.component';
import { LEARN_MORE_CONSTANTS } from './LearnMore.properties';

const LearnMoreContainer = ({
}) => {
  const { t } = useTranslation('landing');

  const { data: session } = useSession();

  const { onError, onSuccess } = useNotifications();
  const { doLoad } = useLoading();

  // Step logic
  const [activeStep, setActiveStep] = useState(0);
  const totalSteps = 3; // We’ll have 3 steps

  // Basic form fields
  const [uniqueId, setUniqueId] = useState(10000);
  const [email, setEmail] = useState(session?.user?.email || '');
  const [role, setRole] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [biggestChallenge, setBiggestChallenge] = useState('');
  const [features, setFeatures] = useState([
    { id: 1, labelKey: 'learnmore.form.fields.features.efforttracking' },
    { id: 2, labelKey: 'learnmore.form.fields.features.transparency' },
    { id: 3, labelKey: 'learnmore.form.fields.features.memberengagement' },
  ]);
  const [newFeature, setNewFeature] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [wantsContact, setWantsContact] = useState(true);
  const [showEmailError, setShowEmailError] = useState(false);

  // Predefined suggestions in Spanish. Could replace with t('common:roles.xxx').
  const roleOptions = [
    { label: t('learnmore.form.fields.roles.admin') },
    { label: t('learnmore.form.fields.roles.directive') },
    { label: t('learnmore.form.fields.roles.collaborator') },
    { label: t('learnmore.form.fields.roles.externaladvisor') },
  ];

  // 1. On mount, check cookies
  useEffect(() => {
    const completedCookie = Cookies.get('learnMoreCompleted');
    const contactCookie = Cookies.get('learnMoreWantsContact');

    if (completedCookie === 'true') {
      setIsSubmitted(true);
      setWantsContact(contactCookie === 'true');
    }
  }, []);

  const handleNext = async () => {
    if (activeStep === 0 && wantsContact && !email.trim()) {
      // Show the error
      setShowEmailError(true);
      // set some error or show a notification, or do nothing but return
      onError(t(t('learnmore.form.steps.1.next.error')));
      return;
    }
    // If not on the last step, simply go to the next
    if (activeStep < totalSteps - 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      // Last step -> Perform final submission
      await onSubmit();
    }
  };

  const handleBack = () => {
    // Move to the previous step if possible
    setActiveStep((prev) => (prev > 0 ? prev - 1 : 0));
  };

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
        wantsContact,
        featurePriorities: features.map((f) => f.labelKey),
        // Possibly also ask for email, or any other fields
      };

      await api.front.saveSurveyResponse(
        formData,
        LEARN_MORE_CONSTANTS.LS1_EXPERIMENT_KEY
      );

      Cookies.set('learnMoreCompleted', 'true', { expires: 30 }); // expires in 30 days
      Cookies.set('learnMoreWantsContact', wantsContact ? 'true' : 'false', { expires: 30 });

      setIsSubmitted(true);
      onSuccess(t('learnmore.save.success'));
    } catch (err) {
      logger.error(err);
      onError(t('learnmore.save.error'));
    }

    doLoad(false);
  };

  // 3. Provide a function to "refill" the form
  const handleRefillForm = () => {
    // Remove cookies
    Cookies.remove('learnMoreCompleted');
    Cookies.remove('learnMoreWantsContact');
    // Reset local states
    setIsSubmitted(false);
    setWantsContact(false);
    // Also reset other form fields if desired:
    // setEmail(''); setRole(''); setCompanySize(''); etc.
    setEmail(session?.user?.email || '');
    setWantsContact(true);
    setActiveStep(0); // back to step 0 if using multi-step
  };

  return (
    <LearnMore
      // Step logic
      activeStep={activeStep}
      totalSteps={totalSteps}
      handleNext={handleNext}
      handleBack={handleBack}

      // Form fields and functions
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
      wantsContact={wantsContact}
      setWantsContact={setWantsContact}
      showEmailError={showEmailError}
      setShowEmailError={setShowEmailError}
      onRefillForm={handleRefillForm}
      isSubmitted={isSubmitted}
    />
  );
};

LearnMoreContainer.defaultProps = {
};
LearnMoreContainer.propTypes = {
};

export default LearnMoreContainer;
