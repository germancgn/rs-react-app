const hasUppercase = (string: string) => /[A-ZА-Я]/.test(string);
const hasLowercase = (string: string) => /[a-zа-я]/.test(string);
const hasDigits = (string: string) => /[\d]/.test(string);
const hasSymbols = (string: string) => /[\W]/.test(string);

const checkPasswordRules = (password: string) => {
  return {
    uppercase: hasUppercase(password),
    lowercase: hasLowercase(password),
    digits: hasDigits(password),
    symbols: hasSymbols(password),
  };
};

export {
  hasUppercase,
  hasLowercase,
  hasDigits,
  hasSymbols,
  checkPasswordRules,
};
