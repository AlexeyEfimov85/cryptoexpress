import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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

@Entity()
export class CurrencyDay {
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

@Entity()
export class CurrencyWeek {
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