import {IsNotEmpty, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateCatDto {

    @ApiProperty({example: 'Черч', description: 'Имя кота'})
    @IsNotEmpty({
        message: `Cat should have a name`
    })
    @Length(3, 15)
    readonly name: string;

    @ApiProperty({example: '666', description: 'Цена кота'})
    @IsNotEmpty({
        message: `Cat should have a price`
    })
    readonly price: number;

    @ApiProperty({example: 'Черный', description: 'Цвет'})
    @IsNotEmpty({
        message: `Cat should have a color`
    })
    readonly color: string;

    @ApiProperty({example: 'Френчи', description: 'Название породы'})
    @IsNotEmpty({
        message: `Cat should have a breed`
    })
    readonly name_breed: string;

    @ApiProperty({example: '3', description: 'Возраст котика в годиках'})
    public age: number;

}