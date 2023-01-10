import { Address } from './address';
import { PhoneNumber } from './phone-number';

export interface OwnerData {
  name: string;
  phoneNumber: PhoneNumber;
  address: Address;
}
