import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class PetEntity {
  @PrimaryColumn()
  id: string;
}
