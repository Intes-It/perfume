import { isValidPhoneNumber } from 'libphonenumber-js';

export default function validatePhoneNumber(phoneNumber: string, countryCode: any): boolean {
  return isValidPhoneNumber(phoneNumber, countryCode);
}
