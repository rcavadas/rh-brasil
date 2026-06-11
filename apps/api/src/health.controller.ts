import { Controller, Get } from '@nestjs/common';
import { Public } from './authz.decorators.js';

@Controller('health')
export class HealthController {
  @Public()
  @Get()
  getHealth(): { status: string; service: string } {
    return { status: 'ok', service: 'rh-api' };
  }
}
