import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Forecast extends Document {
  @Prop({ type: String, required: true })
  city_id: string;

  @Prop({ type: Number, required: true })
  dt: number;

  @Prop({ type: Number, required: true })
  temp: number;

  @Prop({ type: Number, required: true })
  temp_min: number;

  @Prop({ type: Number, required: true })
  temp_max: number;

  @Prop({ type: Number, required: true })
  humidity: number;
}

export const ForecastSchema = SchemaFactory.createForClass(Forecast);