import api from '../../../../../../api';
import { obtainValidatedToken } from '../../../../../../utils/api/apiHelper';
import InternalServerError from '../../../../../../utils/errors/InternalServerError';
import MethodNotAllowedError from '../../../../../../utils/errors/MethodNotAllowedError';
import logger from '../../../../../../utils/logger';

const page = async (req, res) => {
  if (req.method === 'GET') {
    const validatedToken = await obtainValidatedToken(req);

    // Don't want to allow anyone get video data on ouw behalf
    if (!validatedToken) {
      const errorMessage = `Not authenticated to obtain youtube video data [${req.method}]`,
        internalServerErr = new InternalServerError(
          errorMessage,
          'YOUTUBE_VIDEO_DATA_FETCH'
        );
      res.status(401).json(internalServerErr.asObject());

    } else {
      try {
        const data = await api.thirdParties.fetchYoutubeVideoTumbnail(
          req.query.videoId,
        );
        res.status(200).json(data);
      } catch (err) {
        const errorMessage = `Error retriving youtube video data [${req.method}]`,
          internalServerErr = new InternalServerError(
            errorMessage,
            'YOUTUBE_VIDEO_DATA_FETCH'
          );
        logger.error(
          errorMessage,
          typeof err === 'object' && !err instanceof Error
            ? JSON.stringify(err)
            : err
        );
        res.status(internalServerErr.status).json(internalServerErr.asObject());
      }
    }
  } else {
    const mnaError = new MethodNotAllowedError(
      `No API support for ${req.method} HTTP method`,
      'YOUTUBE_VIDEO_DATA'
    );
    res.status(mnaError.status).json(mnaError.asObject());
  }
};

export default page;