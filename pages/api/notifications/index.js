import api from '../../../api';
import { obtainValidatedToken } from '../../../utils/api/apiHelper';
import InternalServerError from '../../../utils/errors/InternalServerError';
import MethodNotAllowedError from '../../../utils/errors/MethodNotAllowedError';
import logger from '../../../utils/logger';

const page = async (req, res) => {
  console.log('API PAGEE');
  console.log(req.headers);
  if (req.method === 'GET' && req.headers?.['accept'] === 'text/event-stream') {
    console.log('API PAGEE1111');
    const validatedToken = await obtainValidatedToken(req);
    try {
      res.writeHead(200, {
        'Connection': 'keep-alive',
        'Content-Encoding': 'none',
        'Cache-Control': 'no-cache, no-transform',
        'Content-Type': 'text/event-stream',
      });

      const downstreamEvSource =
        api.notifications.listenContributorNotifications(validatedToken);
      downstreamEvSource.onmessage = (m) => {
        console.log('EVEVEVEVEVEVE2222222');
        console.log(m);
        console.log('EVEVEVEVEVEVE222222====');
        res.write(`event: message\ndata: ${m.data}\n\n`);
      };

      downstreamEvSource.onerror = (e) => {
        console.error(e);
        evtSource.close();
      };

      req.socket.on('close', () => {
        evtSource.close();
        res.end();
      });
    } catch (e) {
      res.end();
    }
  } else if (req.method === 'GET') {
    console.log('API PAGEE22222');
    // Get notifications for contributor
    const validatedToken = await obtainValidatedToken(req);
    try {
      const data = await api.notifications.getNotifications(
        validatedToken,
        req.query
      );
      res.status(200).json(data);
    } catch (err) {
      const errorMessage = `Error retriving Contributor Notifications [${req.method}]`,
        internalServerErr = new InternalServerError(
          errorMessage,
          'NOTIFICATIONS_FETCH'
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
      'NOTIFICATIONS'
    );
    res.status(mnaError.status).json(mnaError.asObject());
  }
};

export default page;
