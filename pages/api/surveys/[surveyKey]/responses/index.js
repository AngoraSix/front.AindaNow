import api from '../../../../../api';
import config from '../../../../../config';
import { obtainValidatedToken } from '../../../../../utils/api/apiHelper';
import InternalServerError from '../../../../../utils/errors/InternalServerError';
import MethodNotAllowedError from '../../../../../utils/errors/MethodNotAllowedError';
import logger from '../../../../../utils/logger';
import { validateRecaptchaToken } from '../../../../../utils/recaptcha/recaptchaUtils';

const page = async (req, res) => {
    if (req.method === 'POST') {
        const [isValidCaptcha, requestBody] = await validateRecaptchaToken(req)

        if (!isValidCaptcha) {
            return res.status(400).json({ error: 'Missing/Invalid Google reCAPTCHA token' });
        }
        
        const validatedToken = await obtainValidatedToken(req);
        try {
            const data = await api.surveys.saveSurveyResponse(
                requestBody,
                req.query.surveyKey,
                validatedToken
            );

            res.status(200).json(data);
        } catch (err) {
            const errorMessage = `Error saving Survey Response [${req.method}]`,
                internalServerErr = new InternalServerError(
                    errorMessage,
                    'SURVEY_RESPONSE_SAVE'
                );
            logger.error(
                errorMessage,
                typeof err === 'object' && !err instanceof Error
                    ? JSON.stringify(err)
                    : err
            );
            res.status(internalServerErr.status).json(internalServerErr.asObject());
        }
    } else {
        const mnaError = new MethodNotAllowedError(
            `No API support for ${req.method} HTTP method`,
            'SOURCE_SYNC'
        );
        res.status(mnaError.status).json(mnaError.asObject());
    }
};

export default page;
