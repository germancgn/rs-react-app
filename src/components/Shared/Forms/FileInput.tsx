import { useTranslations } from 'next-intl';

type FileInputProps = {
  id: string;
  label: string;
  name: string;
  errors?: string[] | null;
  accept: string;
  register?: Record<string, unknown>;
};

export default function FileInput({
  id,
  name,
  label,
  errors,
  accept,
  register = {},
}: FileInputProps) {
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
            type="file"
            id={id}
            name={name}
            defaultValue=""
            accept={accept}
            {...register}
            hidden
            multiple={false}
          />

          <label htmlFor={id} className="form-file-button w-fit">
            {t('imageLabel')}
          </label>

          <div className="form-errors">
            {errors &&
              errors.map((errorMessageKey, i) => (
                <span className="form-error" key={i}>
                  {t(errorMessageKey, { type: 'JPEG, PNG', size: '5' })}
                </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
