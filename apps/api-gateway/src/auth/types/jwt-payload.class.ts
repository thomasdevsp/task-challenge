export class JwtPayload {
  sub: number;
  email: string;
  type: string;
  iat?: number;
  exp?: number;
}
