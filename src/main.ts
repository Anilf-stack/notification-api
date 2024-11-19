import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Handler } from '@netlify/functions'; 

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(process.env.PORT ?? 3000);
}

export default async function handler(req: any, res: any) {
    const app = await bootstrap();
   
}

