import z from 'zod/v4';

const fileSchema = z.preprocess(
  (value) => {
    if (value instanceof File) return value;
    else if (value instanceof FileList) {
      if (value && value[0]) return value[0];
      return new File([], '');
    }
  },
  z
    .file({
      message: 'fileType',
    })
    .max(5 * 1024 * 1024, {
      message: 'fileSizeMax',
    })
    .mime(['image/png', 'image/jpeg'], {
      message: 'fileType',
    })
    .transform(async (file) => {
      const buffer = await file.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      return `data:${file.type};base64,${base64}`;
    })
);

const nameSchema = z
  .string()
  .regex(/^[A-ZА-Я]/, {
    message: 'nameStartWithUppercase',
  })
  .regex(/^[A-Za-zА-Яа-я\s]*$/, {
    message: 'nameLettersAndSpaces',
  });

const ageSchema = z.preprocess(
  (value) => Number(value),
  z
    .number({
      message: 'agePositiveNumber',
    })
    .positive({
      message: 'agePositiveNumber',
    })
);

const emailSchema = z.email({
  message: 'invalidEmail',
});

const passwordSchema = z
  .string()
  .regex(/\d/, { message: 'passwordMustHaveDigit' })
  .regex(/[a-zа-я]/, { message: 'passwordMustHaveLowercaseLetter' })
  .regex(/[A-ZА-Я]/, { message: 'passwordMustHaveUppercaseLetter' })
  .regex(/[^A-Za-zА-Яа-я0-9]/, {
    message: 'passwordMustHaveSpecialSymbol',
  });

const genderSchema = z.preprocess(
  (value) => (value == null ? '' : value),
  z.string().nonempty({
    message: 'genderMustBeSelected',
  })
);

const termsSchema = z.preprocess(
  (value) => {
    if (typeof value === 'boolean') return value;
    else if (typeof value === 'string' && value === 'on') {
      return true;
    }
    return false;
  },
  z.boolean().refine((value) => value === true, {
    message: 'acceptTermsAndConditions',
  })
);

const countrySchema = z.string().nonempty({ error: 'countryMustBeSelected' });

const formDataSchema = z
  .object({
    name: nameSchema,
    age: ageSchema,
    email: emailSchema,
    password: passwordSchema,
    repeatPassword: z.string(),
    gender: genderSchema,
    acceptTerms: termsSchema,
    picture: fileSchema,
    country: countrySchema,
  })
  .superRefine(({ repeatPassword, password }, ctx) => {
    if (repeatPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'passwordsMustMatch',
        path: ['repeatPassword'],
      });
    }
  });

const comparePasswordsSchema = z
  .object({
    password: z.string(),
    repeatPassword: z.string(),
  })
  .superRefine(({ repeatPassword, password }, ctx) => {
    if (repeatPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'passwordsMustMatch',
        path: ['repeatPassword'],
      });
    }
  });

export {
  fileSchema,
  nameSchema,
  ageSchema,
  emailSchema,
  passwordSchema,
  genderSchema,
  termsSchema,
  countrySchema,
  formDataSchema,
  comparePasswordsSchema,
};
