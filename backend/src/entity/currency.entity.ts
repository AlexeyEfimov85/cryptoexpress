import { Entity, Column, PrimaryGeneratedColumn, Decimal128 } from "typeorm";

@Entity()
export class Currency {
    @Column()
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('numeric', {
    scale: 4,
  })
    currentRate!: number;

    @Column()
    currentDate!: string;
}