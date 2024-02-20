import api from '../../../../api';
import { obtainValidatedToken } from '../../../../utils/api/apiHelper';
import APIError from '../../../../utils/errors/APIError';
import MethodNotAllowedError from '../../../../utils/errors/MethodNotAllowedError';
import logger from '../../../../utils/logger';

const page = async (req, res) => {
  if (req.method === 'GET') {
    const validatedToken = await obtainValidatedToken(req);
    try {
      const search = req.query.text;
      const projectPresentationsList = 
        await api.projects.fetchProjectPresentations(
            {text: search},
            validatedToken
          );
      res.status(200).json(projectPresentationsList);
    } catch (err) {
      const errorMessage = `Error searching Projects Presentations for Contributor [${req.method}]`;
      const apiError =
        err instanceof APIError
          ? err
          : new APIError(
              `${err.response?.data?.message || errorMessage}`,
              'PRESENTATIONS_FETCH',
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
      'PRESENTATIONS'
    );
    res.status(mnaError.status).json(mnaError.asObject());
  }
};

export default page;
