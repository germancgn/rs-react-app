import { useTranslations } from 'next-intl';

type InputProps = {
  id: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number';
  name: string;
  placeholder: string;
  errors?: string[] | null;
  children?: React.ReactNode;
  register?: Record<string, unknown>;
};

export default function Input({
  id,
  type,
  name,
  label,
  errors,
  children,
  placeholder,
  register = {},
}: InputProps) {
  const t = useTranslations('Forms');

  return (
    <div className="form-group">
      <div className="form-row">
        <label className="form-label" htmlFor={id}>
          {label}:
        </label>
        <div className="input-wrapper">
          <input
            className="form-input"
            type={type}
            id={id}
            name={name}
            defaultValue=""
            placeholder={placeholder}
            {...register}
            aria-label={label}
          />
          <div className="form-errors">
            {errors &&
              errors.map((errorMessageKey, i) => (
                <span className="form-error" key={i}>
                  {t(errorMessageKey)}
                </span>
              ))}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
