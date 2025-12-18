import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('get_users')
  async getUsers(@Payload() usersData: { assigneeIds: number[] }) {
    const data = await this.authService.getUsers(usersData.assigneeIds);

    return data;
  }

  @MessagePattern('register_user')
  async register(
    @Payload() registerData: { name: string; email: string; password: string },
  ) {
    const { name, id, email } = await this.authService.register(registerData);

    return {
      id,
      email,
      name,
      message: 'Registro efetuado com sucesso!',
    };
  }

  @MessagePattern('login_user')
  async login(@Payload() loginData: { email: string; password: string }) {
    const { user, accessToken, refreshToken } =
      await this.authService.login(loginData);

    return {
      user,
      accessToken,
      refreshToken,
      message: 'Login efetuado com sucesso!',
    };
  }

  @MessagePattern('refresh_token')
  async refresh(@Payload() data: { refreshToken: string }) {
    const { accessToken, refreshToken } = await this.authService.refresh(
      data.refreshToken,
    );

    return {
      accessToken,
      refreshToken,
      message: 'Token revalidado com sucesso!',
    };
  }

  @MessagePattern('logout')
  async logout(@Payload() data: { refreshToken: string }) {
    return this.authService.logout(data.refreshToken);
  }
}
