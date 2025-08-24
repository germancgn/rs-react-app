import { SubmitHandler, useForm } from 'react-hook-form';
import {
  comparePasswordsSchema,
  formDataSchema,
} from '../../utils/schemas/formDataSchema';
import { useFormStore } from '../../stores/formStore';
import { useTranslations } from 'next-intl';
import Input from '../Shared/Forms/Input';
import { useState } from 'react';
import z, { ZodError } from 'zod/v4';
import PasswordStrength from '../Shared/Forms/PasswordStrength';
import Radio from '../Shared/Forms/Radio';
import FileInput from '../Shared/Forms/FileInput';
import { checkPasswordRules } from '../../utils/string/stringValidators';
import Checkbox from '../Shared/Forms/Checkbox';
import Select from '../Shared/Forms/Select';

type FormFields = {
  name: string;
  age: string;
  email: string;
  password: string;
  repeatPassword: string;
  gender: string;
  acceptTerms: string;
  picture: File[];
  country: string;
};

type UncontrolledFormProps = {
  hideModal: () => void;
};

export default function ControlledForm({ hideModal }: UncontrolledFormProps) {
  const [errors, setErrors] = useState<Record<string, string[] | null> | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations('Forms');
  const countries = useFormStore((s) => s.countryList);
  const setControlledFormData = useFormStore(
    (state) => state.setControlledFormData
  );
  const [passwordStrength, setPasswordStrength] = useState({
    lowercase: false,
    uppercase: false,
    digits: false,
    symbols: false,
  });
  const { register, handleSubmit, getValues } = useForm<FormFields>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const handleFieldChange = async (
    fieldName: keyof FormFields,
    value: unknown
  ) => {
    try {
      await formDataSchema
        .pick({ [fieldName]: true })
        .parseAsync({ [fieldName]: value });
      setErrors((prev) => {
        if (prev) {
          const newErrors = Object.fromEntries(
            Object.entries(prev).filter(([key]) => key !== fieldName)
          );
          setErrors(Object.keys(newErrors).length ? newErrors : null);
        }
        return null;
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors = z.flattenError(error).fieldErrors;

        setErrors((prev) => {
          if (prev) {
            return { ...prev, ...fieldErrors };
          } else {
            return { ...fieldErrors };
          }
        });
      }
    }
  };

  const handleRepeatPasswordChange = (
    fieldName: string,
    password: string,
    repeatPassword: string
  ) => {
    try {
      comparePasswordsSchema.parse({
        password,
        repeatPassword,
      });

      setErrors((prev) => {
        if (prev) {
          const newErrors = Object.fromEntries(
            Object.entries(prev).filter(([key]) => key !== fieldName)
          );
          setErrors(Object.keys(newErrors).length ? newErrors : null);
        }
        return null;
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors = z.flattenError(error).fieldErrors;
        setErrors((prev) => {
          if (prev) {
            return { ...prev, ...fieldErrors };
          } else {
            return { ...fieldErrors };
          }
        });
      }
    }
  };

  const checkPasswordStrength = (password: string) => {
    setPasswordStrength(() => checkPasswordRules(password));
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    setIsSubmitting(true);

    try {
      setErrors(null);
      const parsedFormData = await formDataSchema.parseAsync(data);
      setControlledFormData(parsedFormData);
      hideModal();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = z.flattenError(error);
        setErrors(errors.fieldErrors);
        setPasswordStrength(() => checkPasswordRules(data.password));
      } else {
        throw error;
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-3xl font-semibold text-gray-300 mb-8">
        Controlled form
      </h3>

      <Input
        type="text"
        name="name"
        id="name"
        label={t('nameLabel')}
        placeholder={t('namePlaceholder')}
        errors={errors && errors.name}
        register={register('name', {
          onChange: (e) => handleFieldChange('name', e.target.value),
        })}
      />

      <Input
        type="text"
        name="age"
        id="age"
        label={t('ageLabel')}
        placeholder={t('agePlaceholder')}
        errors={errors && errors.age}
        register={register('age', {
          onChange: (e) => {
            handleFieldChange('age', e.target.value);
          },
        })}
      />

      <Input
        type="email"
        name="email"
        id="email"
        label={t('emailLabel')}
        placeholder={t('emailPlaceholder')}
        errors={errors && errors.email}
        register={register('email', {
          onChange: (e) => handleFieldChange('email', e.target.value),
        })}
      />

      <Input
        type="password"
        name="password"
        id="password"
        label={t('passwordLabel')}
        placeholder={t('passwordPlaceholder')}
        errors={errors && errors.password}
        register={register('password', {
          onChange: (e) => {
            checkPasswordStrength(e.target.value);
            handleFieldChange('password', e.target.value);
          },
        })}
      >
        <PasswordStrength rules={passwordStrength} />
      </Input>

      <Input
        type="password"
        name="repeatPassword"
        id="repeatPassword"
        label={t('repeatPasswordLabel')}
        placeholder={t('repeatPasswordPlaceholder')}
        errors={errors && errors.repeatPassword}
        register={register('repeatPassword', {
          onChange: (e) => {
            const { password } = getValues();
            handleRepeatPasswordChange(
              'repeatPassword',
              password,
              e.target.value
            );
          },
        })}
      />

      <Radio
        name="gender"
        id="gender"
        options={[
          { option: 'male', optionLabel: t('genderMale') },
          { option: 'female', optionLabel: t('genderFemale') },
        ]}
        label={t('genderLabel')}
        errors={errors && errors.gender}
        register={register('gender', {
          onChange: (e) => handleFieldChange('gender', e.target.value),
        })}
      />

      <FileInput
        name="picture"
        id="picture"
        label="Select picture"
        errors={errors && errors.picture}
        accept="image/png, image/jpeg"
        register={register('picture', {
          onChange: (e) => {
            const file = e.target.files;
            handleFieldChange('picture', file);
          },
        })}
      />

      <Select
        name="country"
        id="country"
        label={t('countryLabel')}
        placeholder={t('countryPlaceholder')}
        errors={errors && errors.country}
        items={countries}
        register={register('country', {
          onChange: (e) => handleFieldChange('country', e.target.value),
        })}
      />

      <Checkbox
        name="acceptTerms"
        id="acceptTerms"
        checkboxLabel={t('acceptTermsLabel')}
        label=""
        errors={errors && errors.acceptTerms}
        defaultValue={false}
        register={register('acceptTerms', {
          onChange: (e) => {
            console.log('ch', e.target.checked);
            handleFieldChange('acceptTerms', e.target.checked);
          },
        })}
      />

      <div className="flex gap-4">
        <button
          type="submit"
          className="button-submit"
          disabled={isSubmitting || Object.keys(errors || {}).length > 0}
        >
          {t('submitButtonLabel')}
        </button>
        <button
          type="button"
          className="border rounded border-gray-400 hover:border-gray-200 px-4 py-2 text-gray-400 hover:text-gray-200 cursor-pointer"
          onClick={hideModal}
        >
          {t('closeButtonLabel')}
        </button>
      </div>
    </form>
  );
}
