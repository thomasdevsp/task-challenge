import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { JwtPayload } from '../types/jwt-payload.class';

export const GetUser = createParamDecorator(
  (data: keyof JwtPayload | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request.user as JwtPayload;

    return data ? user?.[data] : user;
  },
);
