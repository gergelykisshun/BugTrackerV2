import { UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

const cookieExtractor = function (req: Request) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  if (!token) throw new UnauthorizedException();
  if (!token.access_token) throw new UnauthorizedException();

  return token.access_token;
};

export default cookieExtractor;
