import { SessionResponseType } from '../../shared/src/Types/SharedTypes';
import {
  AppTypeEnum,
  HTTPResponseCode,
} from '../../shared/src/Types/EnumTypes';
import { logErrorToConsole } from '../Shared/Utils';

export function send400(res: SessionResponseType, message: any) {
  sendError(res, HTTPResponseCode.UserError, message);
}

export function send401(res: SessionResponseType, message: any) {
  sendError(res, HTTPResponseCode.Unauthorized, message);
}

export function send404(res: SessionResponseType, message: any) {
  sendError(res, HTTPResponseCode.NotFound, message);
}

export function send500(res: SessionResponseType, message: any) {
  sendError(res, HTTPResponseCode.ServerError, message);
}

export function sendError(
  res: SessionResponseType,
  code: HTTPResponseCode,
  message: any
) {
  res.setHeader('content-type', 'text/plain');
  res.status(code);

  try {
    if (typeof message === 'object') {
      res.statusMessage = JSON.stringify(message);
    } else {
      res.statusMessage = message.toString();
    }
    res.send(message);
  } catch (err) {
    logErrorToConsole(AppTypeEnum.WEBSERVER, message);
    res.end('An unknown error occured');
  }
}
