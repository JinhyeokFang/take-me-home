import { ValueTransformer } from 'typeorm';
import { Birthday } from '../domain/pet/information/birthday';

export class BirthdayTransformer implements ValueTransformer {
  // 0000-00-00
  to(value: Birthday): string {
    const yearString = value.year.toString();
    const monthRawString = value.month.toString();
    const dayRawString = value.day.toString();

    const monthString = this.zeroFill(monthRawString, 2);
    const dayString = this.zeroFill(dayRawString, 2);

    const birthdayString = `${yearString}-${monthString}-${dayString}`;
    return birthdayString;
  }

  from(value: string): Birthday {
    if (value == null) {
      return {
        year: 0,
        month: 0,
        day: 0,
      };
    }
    const splitedStrings = value.split('-');
    const year = parseInt(splitedStrings[0]);
    const month = parseInt(splitedStrings[1]);
    const day = parseInt(splitedStrings[2]);

    const birthday = {
      year,
      month,
      day,
    };

    return birthday;
  }

  private zeroFill(str: string, length: number): string {
    const zeroStringLength = str.length - length;
    const zeroString = '0'.repeat(zeroStringLength > 0 ? zeroStringLength : 0);
    return zeroString + str;
  }
}
