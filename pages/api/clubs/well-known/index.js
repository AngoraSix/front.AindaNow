import api from '../../../../api';
import { obtainValidatedToken } from '../../../../utils/api/apiHelper';
import InternalServerError from '../../../../utils/errors/InternalServerError';
import MethodNotAllowedError from '../../../../utils/errors/MethodNotAllowedError';
import logger from '../../../../utils/logger';

export default async (req, res) => {
  if (req.method === 'GET') {
    // Get administered projects clubs
    const validatedToken = await obtainValidatedToken(req);
    try {
      const data = await api.clubs.getAdministeredWellKnownClubs(
        validatedToken
      );
      res.status(200).json(data);
    } catch (err) {
      const errorMessage = `Error retriving administered projects clubs [${req.method}]`,
        internalServerErr = new InternalServerError(
          errorMessage,
          'CLUBS_FETCH'
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
      'CLUB'
    );
    res.status(mnaError.status).json(mnaError.asObject());
  }
};
