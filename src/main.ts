import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    // Enable CORS
    const corsOptions: CorsOptions = {
      origin: true, // Set this to your desired origin or `true` to allow all origins
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    };
    app.enableCors(corsOptions);

    await app.listen(3000);
    console.log('Server started on http://localhost:3000');
  } catch (error) {
    console.error('Failed to start the server:', error);
  }
}

bootstrap();