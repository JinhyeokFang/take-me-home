import { Information } from './information';

export class Pet {
  readonly information: Information;
  adoptable = true;

  constructor(information: Information) {
    this.information = information;
  }

  adopt() {
    this.adoptable = false;
  }
}
