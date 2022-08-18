import api from '../../../../../api';
import { obtainValidatedToken } from '../../../../../utils/api/apiHelper';
import APIError from '../../../../../utils/errors/APIError';
import MethodNotAllowedError from '../../../../../utils/errors/MethodNotAllowedError';
import logger from '../../../../../utils/logger';

export default async (req, res) => {
  if (req.method === 'POST') {
    const validatedToken = await obtainValidatedToken(req);
    try {
      const data = await api.clubs.handleWellKnownClubMembership(
        req.body.projectId,
        req.body.clubType,
        req.body.operation,
        validatedToken
      );
      res.status(200).json(data);
    } catch (err) {
      const errorMessage = `Error handling club membership [${req.method}]`;
      const apiError = new APIError(
        `${err.response?.data?.message || errorMessage}`,
        'CLUB_UPDATE_MEMBER',
        err.response?.status || 500
      );
      logger.error(
        errorMessage,
        typeof err === 'object' && !err instanceof Error
          ? JSON.stringify(err)
          : err
      );
      res.status(apiError.status).json(apiError.asObject());
    }
  } else {
    const mnaError = new MethodNotAllowedError(
      `No API support for ${req.method} HTTP method`,
      'CLUB'
    );
    res.status(mnaError.status).json(mnaError.asObject());
  }
};
