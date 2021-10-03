import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, JoinColumn,
    ManyToOne, OneToOne, PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Breed} from "./breed-entity";
import {ImageEntity} from "../images/image.entity";
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class Cat {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @PrimaryGeneratedColumn()
    public id: number;

    @ApiProperty({example: 'Kirill', description: 'Имя кота'})
    @Column()
    public name_cat: string;

    @ApiProperty({example: '{тут объект породы кота}', description: 'Порода кота (внешний ключ для таблицы Breed)'})
    @ManyToOne(type => Breed,
        breed => breed.cats
    )
    @JoinColumn({
         name: 'breed_id'
    })
    public breed: Breed;

    @ApiProperty({example: 'gray', description: 'Цвет кота'})
    @Column()
    public color: string;

    @ApiProperty({example: '600', description: 'Цена бронирования кота на час'})
    @Column({
        type: "numeric"
    })
    public price: number;

    @ApiProperty({example: '3', description: 'Возраст кота (в годиках!!!)'})
    @Column({
        type: "numeric",
        nullable: true
    })
    public age: number;

    @ApiProperty({example: '{объект фотки}', description: 'Фото котика'})
    @OneToOne(
        () => ImageEntity,
        {
            eager: true,
            nullable: true
        }
    )
    @JoinColumn({
        name: "photo"
    })
    public image?: ImageEntity;

    @ApiProperty({example: 'true | false', description: 'Забронирован кот или нет?'})
    @Column({
        default: false
    })
    public is_booked: boolean;

    @ApiProperty({example: '2021-10-03 19:35:44.458634', description: 'Дата создания кота'})
    @CreateDateColumn()
    public created_at: Date;
}