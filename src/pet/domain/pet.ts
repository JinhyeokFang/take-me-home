import { randomUUID } from 'crypto';
import { Information } from './information';

export class Pet {
  readonly information: Information;
  readonly id: string;
  adoptable = true;

  constructor(information: Information) {
    this.information = information;
    this.id = randomUUID();
  }

  adopt() {
    this.adoptable = false;
  }
}
