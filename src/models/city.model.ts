import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class City extends Document {
  @Prop({ required: true })
  city_id: string;

  @Prop({ required: true })
  city_name: string;

  @Prop({ required: true })
  city_timeZone: string;

  @Prop({ required: true })
  city_latitude: number;

  @Prop({ required: true })
  city_longitude: number;
}

export const CitySchema = SchemaFactory.createForClass(City);
