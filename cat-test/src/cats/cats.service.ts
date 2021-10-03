import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {CatsRepository} from "./cats.repository";
import {BreedRepository} from "./breed.repository";
import {CreateBreedDto} from "./dto/create-breed.dto";
import {CreateCatDto} from "./dto/create-cat.dto";
import {UpdateCatDto} from "./dto/update-cat.dto";
import {HttpException, HttpStatus } from '@nestjs/common';


import {
    paginate,
    IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import {Cat} from "./cat-entity";
import {ImageService} from "../images/image.service";

@Injectable()
export class CatsService {
    constructor(@InjectRepository(CatsRepository) private catsRepository: CatsRepository,
                @InjectRepository(BreedRepository) private breedRepository: BreedRepository,
                private readonly imageService: ImageService) {}

    async getAllBreeds() {
        const breeds = await this.breedRepository.find({select: ["breed_id", "name_breed", "created_at"]});
        return breeds;
    }

    async getCat(id: number) {
        const cat = await this.catsRepository.findOne(id);
        if(!cat){
            throw new HttpException('[There is no such cat!]', HttpStatus.NOT_FOUND);
        }
        return cat;
    }

    async paginateCats(options:IPaginationOptions) {
        return await paginate<Cat>(this.catsRepository, options, {relations: ['breed']});
    }


     async getAllBookedCats() {
         const cats = await this.catsRepository.find({
             relations: ["breed"],
             where: {is_booked: true}
         });

         if(Object.keys(cats).length === 0){
             throw new HttpException('[There are no such cats!]', HttpStatus.NOT_FOUND);
         }
         console.log(typeof cats);
         return cats;
    }

    async getAllNotBookedCats() {
        const cats = await this.catsRepository.find({
            relations: ["breed"],
            where: {is_booked: false}
        });

        if(Object.keys(cats).length === 0){
            throw new HttpException('[There are no such cats!]', HttpStatus.NOT_FOUND);
        }

        return cats;
    }

    async createBreed(dto: CreateBreedDto) {
        const breed =  this.breedRepository.create(dto);
        await this.breedRepository.save(breed);
        console.log(breed);
        return breed;
    }

    async createCat(dto: CreateCatDto){
        let msg = ""
        const breed = await this.breedRepository.findOne({ where: { name_breed: dto.name_breed}});

        if(!breed){
            const newBreed = this.breedRepository.create(dto);
            await this.breedRepository.save(newBreed);
            msg += "[New breed added]";
            const cat =  this.catsRepository.create({...dto,
                breed: newBreed});
            await this.catsRepository.save(cat);
            msg += "[New cat added]";
            return {...cat, msg};
        }

        const cat =  this.catsRepository.create({...dto,
            breed: breed});
        await this.catsRepository.save(cat);
        msg += "[New cat added]";
        return {...cat, msg};
    }

    async updateCat(id: number, dto: UpdateCatDto) {
        const cat = await this.catsRepository.findOneOrFail(id);
        if(!cat.id){
            throw new HttpException('[There is no such cat!]', HttpStatus.NOT_FOUND);
        }

        const breed = await this.breedRepository.findOne({name_breed: dto.name_breed})
        if(dto.name_breed){
            if(!breed){
                return "[First create this breed!]";
            }
        }

        const updatedCat = this.catsRepository.create({...cat, ...dto, breed: breed});
        this.catsRepository.merge(cat, updatedCat);
        return await this.catsRepository.save(updatedCat);

    }

     async remove(id: number){
        return await this.catsRepository.delete(id);
     }

    async bookCat(id: number) {
        await this.catsRepository.update(id, {is_booked: true});
        const cat = await this.catsRepository.findOne(id);
        return cat;
    }

    async unbookCat(id: number) {
        await this.catsRepository.update(id, {is_booked: false});
        const cat = await this.catsRepository.findOne(id);
        return cat;
    }

    async addImage(id: number, imageBuffer: Buffer, filename: string) {
        const image = await this.imageService.uploadPublicFile(imageBuffer, filename);
        const cat = await this.catsRepository.findOne(id);
        console.log("[id]:", id, {cat});
        const imgCat = this.catsRepository.create({...cat, image: image});
        await this.catsRepository.save(imgCat);
        return image;
    }
}
