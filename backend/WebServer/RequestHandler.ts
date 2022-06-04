import { Response } from 'express';
import { logToConsole } from '../Shared/Utils';
import { SessionRequestType } from '../../shared/src/Types/SharedTypes';
import { send401, send500 } from './ErrorHandlers';

export function requestHandler({
  fn,
  requireAuth = false,
  requireAdmin = false,
}: {
  fn: Function;
  requireAuth?: boolean;
  requireAdmin?: boolean;
}) {
  return async function (req: any, res: Response) {
    try {
      if (requireAuth && !authenticateRequest(req, res)) {
        send401(res, '[31104662]: Unauthorized. Please log in.');
        return;
      }
      if (requireAdmin && !authenticateRequest(req, res)) {
        send401(res, '[31104662]: Unauthorized. Please log in.');
        return;
      }

      if (req.session && req.session.user && req.session.user.id) {
        res.locals.userId = req.session.user.id;
      }
      await fn(req, res);
    } catch (err) {
      logToConsole(fn);
      logToConsole({ body: req.body });
      logToConsole(err);
      try {
        send500(
          res,
          '[90006]: A server error occurred. Please contact support'
        );
      } catch (errAlreadySent) {
        logToConsole(String(errAlreadySent));
      }
    }
  };
}

function isRequestAuthenticated(req: SessionRequestType & Express.Request) {
  return !!req.session && !!req.session.user && !!req.session.user.id;
}

export function authenticateRequest(
  req: SessionRequestType & Express.Request,
  res: Response
) {
  if (!isRequestAuthenticated(req)) {
    send401(
      res,
      `[90003]: Authentication required. Please log in. You requested ${req.url}`
    );
    return false;
  }
  return true;
}
