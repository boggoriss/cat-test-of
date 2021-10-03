import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseInterceptors, Req, UploadedFile} from '@nestjs/common';
import {CatsService} from "./cats.service";
import {CreateCatDto} from "./dto/create-cat.dto";
import {CreateBreedDto} from "./dto/create-breed.dto";
import {UpdateCatDto} from "./dto/update-cat.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import { Express } from 'express';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Cat} from "./cat-entity";
import {Breed} from "./breed-entity";
//import {ImageEntity} from "./images/image.entity";


@ApiTags('КОТИКИ')
@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService) {}

    @Get('/hi')
    sayHi() {
        return '[Hi! This is a REST API for cat-booking!]';
    }

    @ApiOperation({summary: "Метод, который возвращает пагинированный список котов"})
    @ApiResponse({status: 200, type: [Cat]})
    @HttpCode(200)
    @Get()
    index(@Query('page') page: number = 1, @Query('limit') limit: number = 5) {
        limit = limit > 100 ? 100 : limit;
        return this.catsService.paginateCats({page, limit, route: "http://localhost:7000/cats"});
    }

    @ApiOperation({summary: "Метод, который возвращает одного кота"})
    @ApiResponse({status: 200, type: Cat})
    @HttpCode(200)
    @Get('/:id')
    async getCat(@Param('id') id: number){
        return await this.catsService.getCat(id);
    }

    @ApiOperation({summary: "Метод, который возвращает забронированных котов"})
    @ApiResponse({status: 200, type: [Cat]})
    @HttpCode(200)
    @Get('/get/booked_cats')
    async getAllBookedCats(){
        return await this.catsService.getAllBookedCats();
    }

    @ApiOperation({summary: "Метод, который возвращает НЕ забронированных котов"})
    @ApiResponse({status: 200, type: [Cat]})
    @HttpCode(200)
    @Get('/get/not_booked_cats')
    async getAllNotBookedCats(){
        return await this.catsService.getAllNotBookedCats();
    }

    @ApiOperation({summary: "Метод, который возвращает все породы"})
    @ApiResponse({status: 200, type: [Breed]})
    @HttpCode(200)
    @Get('/get/get_all_breeds')
    async getAllBreeds(){
        return await this.catsService.getAllBreeds();
    }

    @ApiOperation({summary: "Метод, который позволяет создать кота"})
    @ApiResponse({status: 201, type: Cat})
    @Post('/create_cat')
    @HttpCode(201)
    async createCat(@Body() catDto: CreateCatDto) {
        return await this.catsService.createCat(catDto);
    }

    @ApiOperation({summary: "Метод, который позволяет добавить коту фотографию"})
    // @ApiResponse({status: 201, type: ImageEntity})
    @Post('/add_image/:id')
    @UseInterceptors(FileInterceptor('file'))
    @HttpCode(201)
    async addImage(@Param('id') id: number, @UploadedFile() file: Express.Multer.File){
        return this.catsService.addImage(id, file.buffer, file.originalname);
    }

    @ApiOperation({summary: "Метод, который позволяет создать породу"})
    @ApiResponse({status: 201, type: Cat})
    @Post('/create_breed')
    @HttpCode(201)
    async createBreed(@Body() breedDto: CreateBreedDto) {
        return await this.catsService.createBreed(breedDto);
    }

    @ApiOperation({summary: "Метод, который позволяет обновить кота"})
    @ApiResponse({status: 200, type: Cat})
    @Put('/update_cat/:id')
    @HttpCode(200)
    async updateCat(@Param('id') id: number, @Body() updateCatDto: UpdateCatDto) {
        return await this.catsService.updateCat(id, updateCatDto);
    }

    @ApiOperation({summary: "Метод, который позволяет забронировать кота"})
    @ApiResponse({status: 200, type: Cat})
    @Put('/book_cat/:id')
    @HttpCode(200)
    async bookCat(@Param('id') id: number){
        return await this.catsService.bookCat(id);
    }

    @ApiOperation({summary: "Метод, который позволяет снять бронирование с кота"})
    @ApiResponse({status: 200, type: Cat})
    @Put('unbook_cat/:id')
    @HttpCode(200)
    async unbookCat(@Param('id') id: number){
        return await this.catsService.unbookCat(id);
    }

    @ApiOperation({summary: "Метод, который позволяет удалить кота"})
    @ApiResponse({status: 200, type: Cat})
    @Delete('/delete_cat/:id')
    @HttpCode(200)
    async deleteCat(@Param('id') id: number){
        return await this.catsService.remove(id);
    }

}
