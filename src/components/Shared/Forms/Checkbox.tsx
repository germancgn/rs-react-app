import { useTranslations } from 'next-intl';

type CheckboxProps = {
  id: string;
  label: string;
  name: string;
  errors?: string[] | null;
  defaultValue: boolean;
  checkboxLabel: string;
  register?: Record<string, unknown>;
};

export default function Checkbox({
  id,
  name,
  label,
  errors,
  defaultValue,
  checkboxLabel,
  register = {},
}: CheckboxProps) {
  const t = useTranslations('Forms');

  return (
    <div className="form-group">
      <div className="form-row">
        <label className="form-label" htmlFor={id}>
          {label}
        </label>
        <div className="input-wrapper">
          <div className="flex w-full flex-nowrap gap-2">
            <input
              className="form-checkbox"
              type="checkbox"
              id={id}
              name={name}
              defaultChecked={defaultValue}
              {...register}
            />
            <label className="form-label" htmlFor={id}>
              {checkboxLabel}
            </label>
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
