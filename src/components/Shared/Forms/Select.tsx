import { useTranslations } from 'next-intl';

type SelectProps = {
  id: string;
  label: string;
  name: string;
  placeholder: string;
  errors?: string[] | null;
  items: string[];
};

export default function Select({
  id,
  name,
  label,
  errors,
  items,
  placeholder,
}: SelectProps) {
  const t = useTranslations('Forms');

  return (
    <div className="form-group">
      <div className="form-row">
        <label className="form-label" htmlFor="country">
          {label}:
        </label>
        <div className="input-wrapper">
          <input
            className="form-input"
            type="text"
            id={id}
            name={name}
            list={`${name}-list`}
            defaultValue=""
            placeholder={placeholder}
          />
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
      <datalist id={`${name}-list`}>
        {items.map((key, i) => (
          <option key={i} value={key}>
            {t(key)}
          </option>
        ))}
      </datalist>
    </div>
  );
}
