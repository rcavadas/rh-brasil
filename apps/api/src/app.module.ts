import { Module } from '@nestjs/common';
import { IntegrationsController } from './integrations.controller.js';
import { HealthController } from './health.controller.js';
import { PlatformController } from './platform.controller.js';
import { SliceController } from './slice.controller.js';
import { SliceStore } from './slice.store.js';

@Module({
  controllers: [HealthController, PlatformController, SliceController, IntegrationsController],
  providers: [SliceStore],
})
export class AppModule {}
