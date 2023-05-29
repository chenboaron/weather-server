import { Controller, Get } from '@nestjs/common';
import { ForecastService } from './forecast.service';

@Controller('forecasts')
export class ForecastController {
  constructor(private readonly forecastService: ForecastService) {}

  @Get()
  async getAllForecasts(): Promise<any> {
    try {
      const forecasts = await this.forecastService.getAllForecasts();
      return forecasts;
    } catch (error) {
      console.error('Failed to retrieve forecasts:', error);
      throw new Error('Failed to retrieve forecasts');
    }
  }
}