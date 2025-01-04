import api from '../../api';
import config from '../../config';

export const isValidRecaptchaToken = async (grecaptchaToken) => {
  const captchaResponse = await api.thirdParties.verifyGoogleRecaptchaToken(grecaptchaToken);

  if (!captchaResponse.success || captchaResponse.score < config.thirdParties.googleRecaptcha.minScore) {
    throw new Error('Invalid reCAPTCHA token');
  }
  return true;
};