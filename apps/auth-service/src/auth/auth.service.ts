import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { In, Repository } from 'typeorm';
import { RefreshToken } from './entities/refresh-token.entity';
import { User } from './entities/user.entity';
import { JwtPayload, PayloadAuth } from './types/types';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    private readonly jwtService: JwtService,
  ) {}

  async getUsers(assigneeIds: number[]): Promise<User[]> {
    if (!assigneeIds || assigneeIds.length === 0) return [];

    return await this.usersRepository.find({
      where: {
        id: In(assigneeIds),
      },
      select: ['id', 'email', 'name'],
    });
  }

  async register(data: PayloadAuth): Promise<Omit<User, 'password_hash'>> {
    const { name, email, password } = data;

    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new UnauthorizedException('Email já cadastrado a um usuario');
    }

    const user = this.usersRepository.create({
      name,
      email,
      password_hash: password,
    });

    const savedUser = await this.usersRepository.save(user);

    const { password_hash: _, ...result } = savedUser;

    return result as Omit<User, 'password_hash'>;
  }

  async login(data: PayloadAuth) {
    const { email, password } = data;

    const user = await this.usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciais Inválidas');
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      throw new UnauthorizedException('Credenciais Inválidas');
    }

    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign({ ...payload, type: 'access' });
    const refreshToken = this.jwtService.sign(
      { ...payload, type: 'refresh' },
      { expiresIn: '7d' },
    );

    const newToken = this.refreshTokenRepository.create({
      token_hash: refreshToken, // Use o nome da coluna que você definiu (token_hash ou value)
      userId: user.id,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Exemplo: 7 dias a partir de agora
      is_revoked: false,
    });

    await this.refreshTokenRepository.save(newToken);

    return {
      user: {
        userId: user.id,
        name: user.name,
        email: user.email,
      },
      accessToken,
      refreshToken,
    };
  }

  async refresh(oldRefreshToken: string) {
    const payload = this.jwtService.verify<JwtPayload>(oldRefreshToken);
    if (payload.type !== 'refresh') {
      throw new UnauthorizedException('Tipo de token inválido');
    }

    const tokenRecord = await this.refreshTokenRepository.findOne({
      where: { token_hash: oldRefreshToken },
    });

    if (!tokenRecord) {
      throw new UnauthorizedException('Refresh token inválido ou revogado');
    }

    if (tokenRecord.expires_at < new Date()) {
      throw new UnauthorizedException('Refresh token expirado');
    }

    const user = await this.usersRepository.findOne({
      where: { id: payload.sub },
    });
    if (!user) throw new UnauthorizedException('Usuário não encontrado');

    const newPayload = { email: user.email, sub: user.id };
    const newAccessToken = this.jwtService.sign({
      ...newPayload,
      type: 'access',
    });

    const newRefreshToken = this.jwtService.sign(
      { ...newPayload, type: 'refresh' },
      { expiresIn: '7d' },
    );

    tokenRecord.token_hash = newRefreshToken;
    await this.refreshTokenRepository.save(tokenRecord);

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  async logout(refreshToken: string) {
    const tokenRecord = await this.refreshTokenRepository.findOne({
      where: { token_hash: refreshToken },
    });

    if (tokenRecord) {
      tokenRecord.is_revoked = true;
      await this.refreshTokenRepository.save(tokenRecord);
    }

    return { message: 'Logout realizado com sucesso' };
  }
}
