import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class ValidateProductMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log('hello wrom validateCustomer');
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(403).send({
        message: 'error',
        errors: 'you need authorization token',
      });
    }
    if (authorization === '123') {
      return next();
    } else {
      return res
        .status(400)
        .send({ message: 'error', errors: 'you need authorization token' });
    }
  }
}
