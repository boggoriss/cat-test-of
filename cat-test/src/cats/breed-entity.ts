import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import {Cat} from "./cat-entity";
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class Breed {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @PrimaryGeneratedColumn()
    public breed_id: number;

    @ApiProperty({example: 'Большой русский', description: 'Название породы'})
    @Column({
        unique: true
    })
    public name_breed: string;

    @ApiProperty({description: 'Тут связь между породой и ее котиками'})
    @OneToMany( type => Cat,
        cats => cats.breed
    )
    public cats: Cat[];

    @ApiProperty({example: '2021-10-03 01:47:34.342986', description: 'Дата создания породы'})
    @CreateDateColumn()
    public created_at: Date;

}