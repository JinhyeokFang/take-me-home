import { OwnerType } from '../../domain/owner-type';

export interface CreateOwnerBody {
  type: OwnerType;
  name: string;
  phoneNumber: string;
  city: string;
  street: string;
  zipCode: string;
}
