import api from '../../api';
import config from '../../config';

export const isValidRecaptchaToken = async (grecaptchaToken) => {
  const captchaResponse = await api.thirdParties.verifyGoogleRecaptchaToken(grecaptchaToken);
  console.log("SEDEVEOLVIO GERGERGER");
  console.log(captchaResponse);

  if (!captchaResponse.success || captchaResponse.score < config.thirdParties.googleRecaptcha.minScore) {
    throw new Error('Invalid reCAPTCHA token');
  }
  return true;
};