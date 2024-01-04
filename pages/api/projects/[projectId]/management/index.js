import api from '../../../../../api';
import { obtainValidatedToken } from '../../../../../utils/api/apiHelper';
import APIError from '../../../../../utils/errors/APIError';
import MethodNotAllowedError from '../../../../../utils/errors/MethodNotAllowedError';
import logger from '../../../../../utils/logger';

const page = async (req, res) => {
  if (req.method === 'GET') {
    const validatedToken = await obtainValidatedToken(req);
    try {
      const data = await api.management.getProjectManagement(
        req.query.projectId,
        validatedToken
      );
      res.status(200).json(data);
    } catch (err) {
      const errorMessage = `Error retrieving Management information for Contributor [${req.method}]`;
      const apiError =
        err instanceof APIError
          ? err
          : new APIError(
              `${err.response?.data?.message || errorMessage}`,
              'MANAGEMENT_FETCH',
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
  } else if (req.method === 'POST') {
    const validatedToken = await obtainValidatedToken(req);
    try {
      const data = await api.management.createProjectManagementById(
        req.query.projectId,
        validatedToken
      );
      res.status(200).json(data);
    } catch (err) {
      const errorMessage = `Error creating Project Management for Contributor [${req.method}]`;
      const apiError =
        err instanceof APIError
          ? err
          : new APIError(
              `${err.response?.data?.message || errorMessage}`,
              'MANAGEMENT_CREATE',
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
      'MANAGEMENT'
    );
    res.status(mnaError.status).json(mnaError.asObject());
  }
};

export default page;
