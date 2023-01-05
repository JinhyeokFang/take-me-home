import { randomUUID } from 'crypto';
import { ID } from '../id';
import { Information } from './information/information';

export class Pet {
  readonly information: Information;
  readonly id: ID;

  constructor(information: Information, id?: ID) {
    this.information = information;
    this.id = id || randomUUID();
  }
}
