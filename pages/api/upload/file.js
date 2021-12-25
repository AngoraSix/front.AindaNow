import { getToken } from 'next-auth/jwt';
import { oauthFrameworkConfig } from '../../../config/oauth';
import MethodNotAllowedError from '../../../utils/errors/MethodNotAllowedError';
import { getEnv } from '../../../utils/env';
import api from '../../../api';
import multer from 'multer';
import nextConnect from 'next-connect';
import serviceConfig from '../../../config';

const upload = multer();

const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
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
  } catch (err) {}
});

export default apiRoute;
