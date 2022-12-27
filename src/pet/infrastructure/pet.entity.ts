import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class PetEntity {
  @PrimaryColumn()
  id: string;

  @Column({
    nullable: false,
    default: '',
  })
  name: string;
}
