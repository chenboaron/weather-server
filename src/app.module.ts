import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ForecastController } from './forecast/forecast.controller';
import { ForecastService } from './forecast/forecast.service';
import { MongooseModule } from '@nestjs/mongoose';
import { City, CitySchema } from './models/city.model';
import { Forecast, ForecastSchema } from './models/forecast.model';
import { ForecastModule } from './forecast/forecast.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/weather_db'),
    MongooseModule.forFeature([{ name: City.name, schema: CitySchema }]),
    MongooseModule.forFeature([{ name: Forecast.name, schema: ForecastSchema }]),
    ForecastModule,
  ],
  controllers: [AppController, ForecastController],
  providers: [AppService, ForecastService],
})
export class AppModule {}