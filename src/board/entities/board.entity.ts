import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('Board')
export class Board {
    @PrimaryColumn()
    id: number;

    @Column({ length: 60 })
    title: string

    @Column({ length: 30 })
    start: string;
}
