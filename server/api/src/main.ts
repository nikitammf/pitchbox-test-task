import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({ logger: true }));
    app.setGlobalPrefix('/api/v1');
    app.enableCors({
        methods: ['OPTIONS', 'GET', 'POST'],
    });
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000, '0.0.0.0');
}

bootstrap().catch((ex) => console.error(ex));