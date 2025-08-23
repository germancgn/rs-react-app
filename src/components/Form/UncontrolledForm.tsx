'use client';

import React, { useState } from 'react';
import { formDataSchema } from '../../utils/schemas/formDataSchema';
import { useFormStore } from '../../stores/formStore';
import z, { ZodError } from 'zod/v4';
import { useTranslations } from 'next-intl';
import Input from '../Shared/Forms/Input';
import PasswordStrength from '../Shared/Forms/PasswordStrength';
import Select from '../Shared/Forms/Select';
import Radio from '../Shared/Forms/Radio';
import FileInput from '../Shared/Forms/FileInput';
import Checkbox from '../Shared/Forms/Checkbox';
import {
  hasDigits,
  hasLowercase,
  hasSymbols,
  hasUppercase,
} from '../../utils/string/stringValidators';

type UncontrolledFormProps = {
  hideModal: () => void;
};

export default function UncontrolledForm({ hideModal }: UncontrolledFormProps) {
  const [errors, setErrors] = useState<Record<string, string[]> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations('Forms');
  const countries = useFormStore((s) => s.countryList);
  const setFormData = useFormStore((s) => s.setFormData);
  const [passwordStrength, setPasswordStrength] = useState({
    lowercase: false,
    uppercase: false,
    digits: false,
    symbols: false,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      age: formData.get('age'),
      email: formData.get('email'),
      password: formData.get('password'),
      repeatPassword: formData.get('repeatPassword'),
      gender: formData.get('gender'),
      acceptTerms: formData.get('acceptTerms'),
      picture: formData.get('picture'),
      country: formData.get('country'),
    };

    try {
      setErrors(null);
      const parsedFormData = await formDataSchema.parseAsync(data);
      setFormData(parsedFormData);
      hideModal();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = z.flattenError(error);

        setErrors(errors.fieldErrors);

        const password = formData.get('password')?.toString() ?? '';
        setPasswordStrength(() => ({
          uppercase: hasUppercase(password),
          lowercase: hasLowercase(password),
          digits: hasDigits(password),
          symbols: hasSymbols(password),
        }));
      } else {
        throw error;
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-3xl font-semibold text-gray-300 mb-8">
        Uncontrolled form
      </h3>

      <Input
        type="text"
        name="name"
        id="name"
        label={t('nameLabel')}
        placeholder={t('namePlaceholder')}
        errors={errors && errors.name}
      />

      <Input
        type="number"
        name="age"
        id="age"
        label={t('ageLabel')}
        placeholder={t('agePlaceholder')}
        errors={errors && errors.age}
      />

      <Input
        type="email"
        name="email"
        id="email"
        label={t('emailLabel')}
        placeholder={t('emailPlaceholder')}
        errors={errors && errors.email}
      />

      <Input
        type="password"
        name="password"
        id="password"
        label={t('passwordLabel')}
        placeholder={t('passwordPlaceholder')}
        errors={errors && errors.password}
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
      />

      <FileInput
        name="picture"
        id="picture"
        label="Select picture"
        errors={errors && errors.picture}
        accept="image/png, image/jpeg"
      />

      <Select
        name="country"
        id="country"
        label={t('countryLabel')}
        placeholder={t('countryPlaceholder')}
        errors={errors && errors.country}
        items={countries}
      />

      <Checkbox
        name="acceptTerms"
        id="acceptTerms"
        checkboxLabel={t('acceptTermsLabel')}
        label=""
        errors={errors && errors.acceptTerms}
        defaultValue={false}
      />

      <div className="flex gap-4">
        <button type="submit" className="button-submit" disabled={isSubmitting}>
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
