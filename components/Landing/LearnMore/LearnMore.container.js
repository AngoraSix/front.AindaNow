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

const industryKeys = [
  'learnmore.form.fields.industry.options.agriculture',
  'learnmore.form.fields.industry.options.services',
  'learnmore.form.fields.industry.options.manufacturing',
  'learnmore.form.fields.industry.options.retail',
  'learnmore.form.fields.industry.options.transportation',
  'learnmore.form.fields.industry.options.finance',
  'learnmore.form.fields.industry.options.education',
  'learnmore.form.fields.industry.options.healthcare',
  'learnmore.form.fields.industry.options.energy',
  'learnmore.form.fields.industry.options.nonprofit',
  'learnmore.form.fields.industry.options.publicsector',
  'learnmore.form.fields.industry.options.technology',
  'learnmore.form.fields.industry.options.construction',
  'learnmore.form.fields.industry.options.media',
  'learnmore.form.fields.industry.options.tourism'
];


const defaultFeatures = [
  'learnmore.form.fields.features.efforttracking',
  'learnmore.form.fields.features.transparency',
  'learnmore.form.fields.features.memberengagement',
  'learnmore.form.fields.features.automatedreporting',
  'learnmore.form.fields.features.contributorengagement'
];

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
  const [industry, setIndustry] = useState('');
  const [biggestChallenge, setBiggestChallenge] = useState('');
  const [fairPrice, setFairPrice] = useState(null);
  const priceMarks = [
    { value: 0, labelKey: 'learnmore.form.fields.pricerange.marks.less10' },
    { value: 1, labelKey: 'learnmore.form.fields.pricerange.marks.10to20' },
    { value: 2, labelKey: 'learnmore.form.fields.pricerange.marks.20to35' },
    { value: 3, labelKey: 'learnmore.form.fields.pricerange.marks.35to50' },
    { value: 4, labelKey: 'learnmore.form.fields.pricerange.marks.50to80' },
    { value: 5, labelKey: 'learnmore.form.fields.pricerange.marks.more80' }
  ];

  const [selectedFeatures, setSelectedFeatures] = useState([]);
  // User can add a custom feature as plain text (not i18n)
  const [newFeature, setNewFeature] = useState('');
  const toggleFeature = (featureKeyOrName) => {
    setSelectedFeatures((prev) => {
      if (prev.includes(featureKeyOrName)) {
        return prev.filter((f) => f !== featureKeyOrName);
      }
      return [...prev, featureKeyOrName];
    });
  };
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
      try {
        window.gtag('event', 'click_next', {
          step: activeStep
        });
      } catch (err) {
        console.log(err);
      }
      setActiveStep((prev) => prev + 1);
    } else {
      try {
        window.gtag('event', 'submit_form', {
          step: activeStep
        });
      } catch (err) {
        console.log(err);
      }
      // Last step -> Perform final submission
      await onSubmit();
    }
  };

  const handleBack = () => {
    // Move to the previous step if possible
    setActiveStep((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleAddNewFeature = () => {
    if (!newFeature.trim()) return;
    // Add the user-typed feature as a string
    if (!selectedFeatures.includes(newFeature)) {
      setSelectedFeatures((prev) => [...prev, newFeature]);
    }
    setNewFeature('');
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
        selectedFeatures,
        fairPrice,
        industry,
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



      // Step 1 fields
      email={email}
      setEmail={setEmail}
      roleOptions={roleOptions}
      role={role}
      setRole={setRole}
      companySize={companySize}
      setCompanySize={setCompanySize}
      industry={industry}
      setIndustry={setIndustry}
      industryKeys={industryKeys}
      wantsContact={wantsContact}
      setWantsContact={setWantsContact}

      // Step 2
      defaultFeatures={defaultFeatures}
      selectedFeatures={selectedFeatures}
      toggleFeature={toggleFeature}
      newFeature={newFeature}
      setNewFeature={setNewFeature}
      handleAddNewFeature={handleAddNewFeature}

      // Step 3
      biggestChallenge={biggestChallenge}
      setBiggestChallenge={setBiggestChallenge}
      fairPrice={fairPrice}
      setFairPrice={setFairPrice}
      priceMarks={priceMarks}

      // Submission
      onSubmit={onSubmit}
      onRefillForm={handleRefillForm}
      isSubmitted={isSubmitted}

      // others
      showEmailError={showEmailError}
      setShowEmailError={setShowEmailError}
    />
  );
};

LearnMoreContainer.defaultProps = {
};
LearnMoreContainer.propTypes = {
};

export default LearnMoreContainer;
