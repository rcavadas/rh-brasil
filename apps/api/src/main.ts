import 'reflect-metadata';

import { ValidationPipe } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { NestFactory } from '@nestjs/core';
import { AuthzGuard } from './authz.guard.js';
import { AppModule } from './app.module.js';
import { SliceStore } from './slice.store.js';

function logEvent(level: 'info' | 'warn' | 'error', event: string, details: Record<string, unknown> = {}): void {
  const payload = JSON.stringify({
    app: 'rh-api',
    level,
    event,
    at: new Date().toISOString(),
    ...details,
  });

  if (level === 'error') {
    console.error(payload);
    return;
  }

  if (level === 'warn') {
    console.warn(payload);
    return;
  }

  console.log(payload);
}

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { logger: ['log', 'error', 'warn'] });
  const port = Number(process.env.PORT ?? 3000);
  const allowedOrigins = (process.env.CORS_ORIGINS ?? 'http://localhost:5173,http://127.0.0.1:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableCors({
    origin: allowedOrigins,
  });
  app.useGlobalGuards(new AuthzGuard(app.get(Reflector), app.get(SliceStore)));
  app.setGlobalPrefix('api');
  await app.listen(port, '0.0.0.0');

  const url = await app.getUrl();
  // Runtime mínimo para o slice inicial.
  logEvent('info', 'api.started', { url });
}

bootstrap().catch((error) => {
  logEvent('error', 'api.bootstrap_failed', {
    message: error instanceof Error ? error.message : String(error),
  });
  process.exitCode = 1;
});
