import { Controller, Get, Inject } from '@nestjs/common';
import { Roles } from './authz.decorators.js';
import { SliceStore } from './slice.store.js';

@Controller('v1/platform')
export class PlatformController {
  constructor(@Inject(SliceStore) private readonly store: SliceStore) {}

  @Roles('admin', 'rh', 'auditor')
  @Get('telemetry')
  async getTelemetry() {
    try {
      return await this.store.getPlatformTelemetry();
    } catch (error) {
      console.error(
        JSON.stringify(
          {
            app: 'rh-api',
            event: 'platform.telemetry_failed',
            message: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined,
          },
          null,
          2,
        ),
      );
      throw error;
    }
  }
}
