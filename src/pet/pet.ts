export class Pet {
  adoptable = true;

  adopt() {
    this.adoptable = false;
  }
}
