import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CatsRepository} from "./cats.repository";
import {BreedRepository} from "./breed.repository";
import {CatsController} from "./cats.controller";
import {CatsService} from "./cats.service";
import {ImageService} from "../images/image.service";
import {ImageRepository} from "../images/image.repository";

@Module({
    imports: [TypeOrmModule.forFeature([CatsRepository, BreedRepository, ImageRepository])],
    controllers: [CatsController],
    providers: [CatsService, ImageService]
})
export class CatsModule {}
