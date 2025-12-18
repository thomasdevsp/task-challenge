export class PayloadAuth {
  name?: string;
  email: string;
  password: string;
}

export class JwtPayload {
  sub: number;
  email: string;
  type: string;
  iat?: number;
  exp?: number;
}
