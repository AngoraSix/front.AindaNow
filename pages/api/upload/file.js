import { getToken } from 'next-auth/jwt';
import { oauthFrameworkConfig } from '../../../config/oauth';
import MethodNotAllowedError from '../../../utils/errors/MethodNotAllowedError';
import { getEnv } from '../../../utils/env';
import api from '../../../api';
import multer from 'multer';
import nextConnect from 'next-connect';
import serviceConfig from '../../../config';
import InternalServerError from '../../../utils/errors/InternalServerError';
import logger from '../../../utils/logger';

const upload = multer();

const apiRoute = nextConnect({
  onError(err, req, res) {
    const errorMessage = 'Error uploading file',
      internalServerErr = new InternalServerError(errorMessage, 'FILE_UPLOAD');
    logger.error(
      errorMessage,
      typeof err === 'object' ? JSON.stringify(err) : err
    );
    res.status(internalServerErr.status).json(internalServerErr.asObject());
  },
  // Handle any other HTTP method
  onNoMatch(req, res) {
    const mnaError = new MethodNotAllowedError(
      `No API support for ${req.method} HTTP method`,
      'FILE_UPLOAD'
    );
    res.status(mnaError.status).json(mnaError.asObject());
  },
});

apiRoute.use(upload.array('file'));

export const config = {
  api: {
    bodyParser: false,
  },
};

// Process a POST request
apiRoute.post(async (req, res) => {
  const env = getEnv();
  serviceConfig.applyEnvConfig(env);
  api.applyEnvConfig(env);
  const token = await getToken({
    req,
    secret: oauthFrameworkConfig.jwt.secret,
  });
  const { headers, files, body } = req;
  const validatedToken =
    token?.error !== 'RefreshAccessTokenError' ? token : null;
  try {
    const response = await api.media.uploadImages(files, validatedToken);
    res.status(200).json(response);
  } catch (err) {
    const errorMessage = 'Error uploading file',
      internalServerErr = new InternalServerError(errorMessage, 'FILE_UPLOAD');
    logger.error(
      errorMessage,
      typeof err === 'object' ? JSON.stringify(err) : err
    );
    res.status(internalServerErr.status).json(internalServerErr.asObject());
  }
});

export default apiRoute;
