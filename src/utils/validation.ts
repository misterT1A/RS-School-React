import * as Yup from 'yup';

const MAX_SIZE = 2097152;

const validationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[A-ZА-Я][a-zа-я]*$/, 'Name must start with an uppercase letter')
    .required('Name is required'),
  age: Yup.string()
    .required('Age is required')
    .test('is-valid-age', 'Age must be a positive integer', (value) => {
      const parsedValue = Number(value);
      return !Number.isNaN(parsedValue) && parsedValue > 0 && Number.isInteger(parsedValue);
    }),
  pass: Yup.string()
    .required('Password is required')
    .test('strength', 'Password is too weak', (value) => {
      const hasUppercase = /[A-Z]/.test(value);
      const hasLowercase = /[a-z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      return hasNumber && hasUppercase && hasLowercase && hasSpecialChar;
    }),
  confirmPass: Yup.string()
    .oneOf([Yup.ref('pass')], 'Passwords must match')
    .required('Confirm Password is required'),
  gender: Yup.string().required('Gender is required'),
  agreement: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('You must accept the terms and conditions'),
  image: Yup.mixed<FileList>()
    .required('Image is required')
    .test('fileSize', 'The file must be less than 2 mb', (value) => {
      const file = value[0];
      if (!file || !(file instanceof File)) return false;
      if (!file) return false;
      return file.size <= MAX_SIZE;
    })
    .test('fileType', 'Invalid file type, need jpeg or png', (value) => {
      const file = value[0];
      if (!file || !(file instanceof File)) return false;
      if (!file) return false;
      return ['image/jpeg', 'image/png'].includes(file.type);
    }),
  country: Yup.string().required('Country is required'),
});
export default validationSchema;
