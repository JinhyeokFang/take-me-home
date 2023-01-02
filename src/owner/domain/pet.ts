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

  equal(anotherPet: Pet) {
    const enumeratedInfo = Object.entries(this.information);
    const subtraction = enumeratedInfo.filter((item) => {
      const key = item[0];
      const value = item[1];
      const valueOfAnotherPet = anotherPet.information[key];
      return value !== valueOfAnotherPet;
    });
    const isSame = subtraction.length === 0;
    return isSame;
  }
}
