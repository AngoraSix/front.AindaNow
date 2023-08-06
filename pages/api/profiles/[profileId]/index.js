import { getToken } from 'next-auth/jwt';
import { oauthFrameworkConfig } from '../../../../config/oauth';
import MethodNotAllowedError from '../../../../utils/errors/MethodNotAllowedError';
import { getEnv } from '../../../../utils/env';
import api from '../../../../api';
import config from '../../../../config';
import JSONPatch from '../../../../utils/rest/patch/JSONPatch';
import createPatchBody from '../../../../utils/rest/patch/patchOperations';

const page = async (req, res) => {
  if (req.method === 'PATCH') {
    const env = getEnv();
    config.applyEnvConfig(env);
    api.applyEnvConfig(env);
    const token = await getToken({
      req,
      secret: oauthFrameworkConfig.jwt.secret,
    });
    const validatedToken =
      token?.error !== 'RefreshAccessTokenError' ? token : null;
    try {
      const { data } = await api.contributors.patchContributor(
        req.query.profileId,
        req.body,
        validatedToken
      );
      res.status(200).json({ data });
    } catch (err) {}
  } else {
    const mnaError = new MethodNotAllowedError(
      `No API support for ${req.method} HTTP method`,
      'PROFILE'
    );
    res.status(mnaError.status).json(mnaError.asObject());
  }
};

export default page;
