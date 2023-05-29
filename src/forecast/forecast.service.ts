import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { Forecast } from 'src/models/forecast.model';
import { Cron } from '@nestjs/schedule';
import { City } from 'src/models/city.model';

@Injectable()
export class ForecastService {
    private readonly logger = new Logger(ForecastService.name);

    constructor(@InjectModel(Forecast.name) private forecastModel: Model<Forecast>, @InjectModel(City.name) private cityModel: Model<City>) { }

    // @Cron('*/10 * * * * *') // Runs every 10 seconds
    @Cron('0 */5 * * *') // Runs every 5 hours
    async updateForecast() {
        try {
            const cities = await this.cityModel.distinct('city_id');
            for (const city of cities) {
                const { city_latitude, city_longitude } = await this.getCityCoordinates(city);
                const forecastData = await this.fetchForecastData(city_latitude, city_longitude);
                await this.saveForecastData(city, forecastData);
            }
            console.log('Forecast data updated successfully.');
        } catch (error) {
            console.error('Failed to update forecast data:', error);
        }
    }

    private async getCityCoordinates(cityId: string) {
        const city = await this.cityModel.findOne({ city_id: cityId });
        return {
            city_latitude: city.city_latitude,
            city_longitude: city.city_longitude,
        };
    }

    private async fetchForecastData(latitude: number, longitude: number) {
        const apiKey = '9e16dab1c6a0911ef2e25359803bc18a'; // Replace with your OpenWeather API key
        const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast';
        const queryParams = `?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

        const response = await axios.get(apiUrl + queryParams);
        return response.data;
    }

    private async saveForecastData(cityId: string, forecastData: any) {
        const forecasts = []
        forecastData.list.forEach((item: any) => {
            const forecastTime = new Date(item.dt * 1000).toLocaleTimeString();
            if (forecastTime === '12:00:00') {
                forecasts.push({
                    city_id: cityId,
                    dt: item.dt,
                    temp: item.main.temp,
                    temp_min: item.main.temp_min,
                    temp_max: item.main.temp_max,
                    humidity: item.main.humidity,
                });
            }
        });
        await this.forecastModel.deleteMany({ city_id: cityId });
        await this.forecastModel.create(forecasts);
    }

    async getAllForecasts(): Promise<any> {
        const cities = await this.cityModel.find().exec();
        const forecasts = [];

        try {
            for (const city of cities) {
                const cityForecasts = await this.forecastModel.find({ city_id: city.city_id }).exec();
                const cityData = {
                    city: city,
                    forecasts: cityForecasts,
                };
                forecasts.push(cityData);
            }

            return forecasts;
        } catch (error) {
            console.error('Failed to retrieve forecasts:', error);
            throw new Error('Failed to retrieve forecasts');
        }
    }


}