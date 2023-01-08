import { Owner, OwnerConstructorParams } from './owner';
import { OwnerType } from './owner-type';

export class Individual extends Owner {
  constructor(parameters: OwnerConstructorParams) {
    super(OwnerType.INDIVIDUAL, parameters);
  }
}
