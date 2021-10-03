import {IsNotEmpty, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateCatDto {

    @ApiProperty({example: 'Черч', description: 'Имя кота'})
    @IsNotEmpty({
        message: `Cat should have a name`
    })
    @Length(3, 15)
    name?: string;

    @ApiProperty({example: '666', description: 'Цена кота'})
    @IsNotEmpty({
        message: `Cat should have a price`
    })
    price?: number;

    @ApiProperty({example: 'Черный', description: 'Цвет'})
    @IsNotEmpty({
        message: `Cat should have a color`
    })
    color?: string;

    @ApiProperty({example: 'Френчи', description: 'Название породы'})
    @IsNotEmpty({
        message: `Cat should have a breed`
    })
    name_breed?: string;

}