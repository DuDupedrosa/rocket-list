import { passwordErroValidateEnum } from '../enums/password';

const minLength = 'Pelo menos 8 caracteres';
const specialChar = 'Pelo menos 1 caractere especial';
const minNumber = 'Pelo menos 1 número';
const uppercaseChar = 'Pelo menos 1 caractere maiúsculo';
const lowercaseChar = 'Pelo menos 1 caractere minúsculo';
const differentChars = 'Pelo menos 6 caracteres diferentes';

export const passwordCheckListData = [
  minLength,
  specialChar,
  minNumber,
  uppercaseChar,
  lowercaseChar,
  differentChars,
];

export const erroPasswordData = {
  HAS_UPPER_CASE: {
    enum: passwordErroValidateEnum.HAS_UPPER_CASE,
    key: uppercaseChar,
  },
  HAS_LOWER_CASE: {
    enum: passwordErroValidateEnum.HAS_LOWER_CASE,
    key: lowercaseChar,
  },
  HAS_DIGITS: {
    enum: passwordErroValidateEnum.HAS_DIGITS,
    key: minNumber,
  },
  HAS_SPECIAL_CHARACTER: {
    enum: passwordErroValidateEnum.HAS_SPECIAL_CHARACTER,
    key: specialChar,
  },
  HAS_MIN_DIFFERENT_CHAR: {
    enum: passwordErroValidateEnum.HAS_MIN_DIFFERENT_CHAR,
    key: differentChars,
  },
  HAS_MIN_LENGTH: {
    enum: passwordErroValidateEnum.HAS_MIN_LENGTH,
    key: minLength,
  },
};

export const erroPasswordByEnum = {
  [passwordErroValidateEnum.HAS_UPPER_CASE]: uppercaseChar,
  [passwordErroValidateEnum.HAS_LOWER_CASE]: lowercaseChar,
  [passwordErroValidateEnum.HAS_DIGITS]: minNumber,
  [passwordErroValidateEnum.HAS_SPECIAL_CHARACTER]: specialChar,
  [passwordErroValidateEnum.HAS_MIN_DIFFERENT_CHAR]: differentChars,
  [passwordErroValidateEnum.HAS_MIN_LENGTH]: minLength,
};
