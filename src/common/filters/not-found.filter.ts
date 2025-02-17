import {
  type ExceptionFilter,
  Catch,
  NotFoundException,
  type ArgumentsHost,
} from '@nestjs/common';
import type { Response, Request } from 'express';
import { formatResponse } from '../helpers/response.helper';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response.status(404).json(
      formatResponse('Route not found', {
        statusCode: 404,
        timestamp: new Date().toISOString(),
        path: request.url,
      }, false)
    );
  }
} 