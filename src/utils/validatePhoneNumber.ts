import { CountryCode, isValidPhoneNumber } from "libphonenumber-js";

export default function validatePhoneNumber(
  phoneNumber: string,
  countryCode: CountryCode
): boolean {
  return isValidPhoneNumber(phoneNumber, countryCode);
}
