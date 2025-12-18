import { IsString } from 'class-validator';

export class RefreshTokenResponseDto {
  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;
}
