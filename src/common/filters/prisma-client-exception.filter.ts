import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    switch (exception.code) {
      case 'P2002':
        httpStatus = HttpStatus.CONFLICT;
        message = `Field ${exception.meta.target[0]} already created`;
        break;
      case 'P2025':
        httpStatus = HttpStatus.NOT_FOUND;
        message = `In model ${exception.meta?.modelName} - ${exception.meta?.cause}`;
        break;
    }

    response.status(httpStatus).json({
      statusCode: httpStatus,
      message: message,
    });
  }
}
