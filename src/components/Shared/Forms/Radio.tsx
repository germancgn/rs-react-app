import { useTranslations } from 'next-intl';

type RadioOption = {
  option: string;
  optionLabel: string;
};

type RadioProps = {
  id: string;
  label: string;
  name: string;
  errors?: string[] | null;
  options: RadioOption[];
};

export default function Radio({
  id,
  name,
  label,
  errors,
  options,
}: RadioProps) {
  const t = useTranslations('Forms');

  return (
    <div className="form-group">
      <div className="form-row">
        <label className="form-label" htmlFor={id}>
          {label}:
        </label>
        <div className="input-wrapper">
          <div className="radio-buttons-row flex gap-2">
            {options.map(({ option, optionLabel }, i) => (
              <div className="flex gap-2 items-center" key={i}>
                <input
                  className="form-checkbox"
                  type="radio"
                  id={`${name}-${option}`}
                  name={name}
                  value={option}
                />
                <label className="form-label" htmlFor={`${name}-${option}`}>
                  {optionLabel}
                </label>
              </div>
            ))}
          </div>
          <div className="form-errors">
            {errors &&
              errors.map((errorMessageKey, i) => (
                <span className="form-error" key={i}>
                  {t(errorMessageKey)}
                </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
