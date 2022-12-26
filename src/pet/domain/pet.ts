import { randomUUID } from 'crypto';
import { Information } from './information';

export class Pet {
  readonly information: Information;
  readonly id: string;
  adoptable = true;

  constructor(information: Information, id?: string) {
    this.information = information;
    this.id = id || randomUUID();
  }

  adopt() {
    this.adoptable = false;
  }
}
