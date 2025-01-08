import api from '../../api';
import config from '../../config';

export const validateRecaptchaToken = async (req) => {
  let isValidRecaptchaToken = false;
  const { grecaptchaToken, ...reqBody } = req.body;
  if (grecaptchaToken) {
    const captchaResponse = await api.thirdParties.verifyGoogleRecaptchaToken(grecaptchaToken);

    isValidRecaptchaToken = captchaResponse.success || captchaResponse.score > config.thirdParties.googleRecaptcha.minScore
  }
  return [isValidRecaptchaToken, reqBody];
};