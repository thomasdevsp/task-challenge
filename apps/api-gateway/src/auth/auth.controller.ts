import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { LoginResponseDto } from './dto/login-response.dto';
import { RefreshTokenResponseDto } from './dto/refresh-token-response.dto';
import { RegisterResponseDto } from './dto/register-response.dto copy';

@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private authClient: ClientProxy) {}

  @Post('users')
  @HttpCode(201)
  async getUsers(
    @Body() getUsersData: { assigneeIds: number[] },
  ): Promise<LoginResponseDto> {
    const resultObservable = this.authClient.send<LoginResponseDto>(
      'get_users',
      getUsersData,
    );

    const response = await firstValueFrom(resultObservable);
    return response;
  }

  @Post('register')
  @HttpCode(201)
  async register(
    @Body() registerData: { name: string; emaiL: string; password: string },
  ): Promise<RegisterResponseDto> {
    const resultObservable = this.authClient.send<RegisterResponseDto>(
      'register_user',
      registerData,
    );

    const response = await firstValueFrom(resultObservable);
    return response;
  }

  @Post('login')
  @HttpCode(201)
  async login(
    @Body() loginData: { emaiL: string; password: string },
  ): Promise<LoginResponseDto> {
    const resultObservable = this.authClient.send<LoginResponseDto>(
      'login_user',
      loginData,
    );

    const response = await firstValueFrom(resultObservable);
    return response;
  }

  @Post('refresh')
  @HttpCode(201)
  async refresh(
    @Body() refreshToken: { refreshToken: string },
  ): Promise<RefreshTokenResponseDto> {
    const resultObservable = this.authClient.send<RefreshTokenResponseDto>(
      'refresh_token',
      refreshToken,
    );

    const response = await firstValueFrom(resultObservable);
    return response;
  }

  @Post('logout')
  @HttpCode(201)
  logout(@Body('refreshToken') refreshToken: string) {
    return this.authClient.send('logout', { refreshToken });
  }
}
