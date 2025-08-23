import { useTranslations } from 'next-intl';

type InputProps = {
  id: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number';
  name: string;
  placeholder: string;
  errors?: string[] | null;
  children?: React.ReactNode;
};

export default function Input({
  id,
  type,
  name,
  label,
  errors,
  children,
  placeholder,
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
