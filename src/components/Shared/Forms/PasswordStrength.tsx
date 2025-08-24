import { useTranslations } from 'next-intl';
import { Check, X } from '../Icon';
import { useMemo } from 'react';

type PasswordRules = {
  uppercase: boolean;
  lowercase: boolean;
  digits: boolean;
  symbols: boolean;
};

type PasswordStrengthProps = {
  rules: PasswordRules;
};

const calculatePasswordLevel = ({
  uppercase,
  lowercase,
  digits,
  symbols,
}: PasswordRules) => {
  let points = 0;
  if (uppercase) points += 1;
  if (lowercase) points += 1;
  if (digits) points += 1;
  if (symbols) points += 1;
  if (points == 0) return '';
  if (points <= 1) return 'bad';
  if (points <= 2) return 'average';
  if (points <= 3) return 'good';
  return 'excelent';
};

export default function PasswordStrength({ rules }: PasswordStrengthProps) {
  const t = useTranslations('Forms');
  const passwordLevel = useMemo(() => calculatePasswordLevel(rules), [rules]);

  const ruleList = [
    { key: 'textPasswordUppercase', valid: rules.uppercase },
    { key: 'textPasswordLowercase', valid: rules.lowercase },
    { key: 'textPasswordDigits', valid: rules.digits },
    { key: 'textPasswordSymbols', valid: rules.symbols },
  ];

  return (
    <div className="flex flex-col gap-2 mb-2" data-testid="password-strength">
      <div className="password-strength-container">
        <div className={`password-strength-bar ${passwordLevel}`} />
      </div>

      <ul className="text-gray-400 text-sm">
        {ruleList.map(({ key, valid }) => (
          <li
            key={key}
            className={`flex gap-2 ${valid ? 'text-green-400' : ''}`}
          >
            <span className="w-4 block">
              {valid ? <Check size={16} /> : <X size={16} />}
            </span>
            {t(key)}
          </li>
        ))}
      </ul>
    </div>
  );
}
