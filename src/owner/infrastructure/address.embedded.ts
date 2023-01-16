import { Column } from 'typeorm';

export class Address {
  constructor(city: string, street: string, zipCode: string) {
    this.city = city;
    this.street = street;
    this.zipCode = zipCode;
  }

  @Column()
  city: string;

  @Column()
  street: string;

  @Column()
  zipCode: string;
}
