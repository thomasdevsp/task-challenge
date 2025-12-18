import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { RefreshToken } from './auth/entities/refresh-token.entity';
import { User } from './auth/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'task_challenge_db',
      schema: 'auth',
      entities: [User, RefreshToken],
      synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
