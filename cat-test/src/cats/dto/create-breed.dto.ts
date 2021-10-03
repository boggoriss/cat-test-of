import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateBreedDto {
@ApiProperty({example: 'Френчи', description: 'Название породы'})
    @IsNotEmpty({
        message: `Cat should have a breed`
    })
    readonly name_breed: string;
}