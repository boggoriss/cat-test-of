import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class ImageEntity {

    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @PrimaryGeneratedColumn()
    public id: number;

    @ApiProperty({example: '*ОЧЕНЬ страшный юрл картинки*', description: 'url картинки из s3'})
    @Column()
    public url: string;

    @ApiProperty({example: 'fc48fb2b-fd7c-4c3f-9bc7-d876516afa9e-kitten.jpg', description: 'url картинки'})
    @Column()
    public key: string;
}