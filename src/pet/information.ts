import { Birthday } from "./birthday";
import { Gender } from "./gender";
import { Species } from "./species";

export interface Information {
  name: string;
  age: number;
  gender: Gender;
  species: Species;
  birthday: Birthday;
}
