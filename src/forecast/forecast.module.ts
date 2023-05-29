import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { City, CitySchema } from 'src/models/city.model';
import { Forecast, ForecastSchema } from 'src/models/forecast.model';
import { ForecastController } from './forecast.controller';
import { ForecastService } from './forecast.service';
import { ScheduleModule } from '@nestjs/schedule';


@Module({
    imports: [
      MongooseModule.forFeature([{ name: City.name, schema: CitySchema }]),
      MongooseModule.forFeature([{ name: Forecast.name, schema: ForecastSchema }]),
      ScheduleModule.forRoot()
    ],
    controllers: [],
    providers: [ForecastService, ForecastController],
  })
export class ForecastModule {}
