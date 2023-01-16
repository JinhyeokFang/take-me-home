import { Column } from 'typeorm';

export class Address {
  constructor(city: string, street: string, zipCode: string) {
    this.city = city;
    this.street = street;
    this.zipCode = zipCode;
  }

  @Column({
    default: '',
  })
  city: string;

  @Column({
    default: '',
  })
  street: string;

  @Column({
    default: '',
  })
  zipCode: string;
}
