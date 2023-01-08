import { ValueTransformer } from 'typeorm';
import { Birthday } from '../domain/pet/information/birthday';

export class BirthdayTransformer implements ValueTransformer {
  // 0000-00-00
  to(value: Birthday): string {
    const yearString = value.year.toString();
    const monthString = this.zeroFill(value.month.toString(), 2);
    const dayString = this.zeroFill(value.day.toString(), 2);

    return `${yearString}-${monthString}-${dayString}`;
  }

  from(value: string): Birthday {
    if (value == null) {
      return null;
    }

    const splitedStrings = value.split('-');

    return {
      year: parseInt(splitedStrings[0]),
      month: parseInt(splitedStrings[1]),
      day: parseInt(splitedStrings[2]),
    };
  }

  private zeroFill(str: string, length: number): string {
    const zeroStringLength = str.length - length;
    if (zeroStringLength < 0) {
      return str;
    }

    const zeroString = '0'.repeat(zeroStringLength);
    return zeroString + str;
  }
}
