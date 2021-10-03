import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import { config } from 'aws-sdk';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function start(){
    const PORT = process.env.PORT || 3000;
    config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION
    });
    const app = await NestFactory.create(AppModule);
    const configDoc = new DocumentBuilder()
        .setTitle('Cats-booking REST API')
        .setDescription('Тестовое задание (пожалуста пусть хорошо сделал)')
        .setVersion('1.0.0')
        .addTag('Cats')
        .build();
    const document = SwaggerModule.createDocument(app, configDoc);
    SwaggerModule.setup("/api/docs", app, document)
    await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}

start()
