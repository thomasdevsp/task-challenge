import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Task Challenge API')
    .setDescription(
      'Documentação das rotas do API Gateway para o sistema de tarefas colaborativo',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Insira o token JWT',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  app.enableCors({
    origin: 'http://localhost:3000', // A URL do seu Vite
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Importante se você for usar cookies futuramente
  });

  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3001);
  console.log('API gateway está rodando na porta: http://localhost:3001/api');
  console.log('Swagger docs available on http://localhost:3001/docs');
}
bootstrap();
