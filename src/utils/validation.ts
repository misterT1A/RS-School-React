import * as Yup from 'yup';

const MAX_SIZE = 2097152;

const countries = [
  'Uganda',
  'Kongo',
  'Kemeron',
  'Bolivia',
  'Nepal',
  'Iceland',
  'Mongolia',
  'Honduras',
  'Madagascar',
  'Fiji',
  'Slovenia',
  'Laos',
  'Uruguay',
  'Morocco',
  'Tanzania',
  'Jamaica',
  'Finland',
  'Armenia',
  'Peru',
  'Ghana',
];

const validationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[A-ZА-Я][a-zа-я]*$/, 'Name should start with an uppercase letter')
    .required('Name is required'),
  age: Yup.string()
    .required('Age is required')
    .test('is-valid-age', 'Age should be a positive number', (value) => {
      const parsedValue = Number(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      return !Number.isNaN(parsedValue) && parsedValue > 0 && Number.isInteger(parsedValue) && !hasSpecialChar;
    }),
  pass: Yup.string()
    .required('Password is required')
    .test('strength', 'Password is too weak', (value) => {
      const hasUppercase = /[A-ZА-Я]/.test(value);
      const hasLowercase = /[a-zа-я]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      return hasNumber && hasUppercase && hasLowercase && hasSpecialChar;
    }),
  confirmPass: Yup.string()
    .oneOf([Yup.ref('pass')], 'Passwords should match')
    .required('Confirm Password is required'),
  gender: Yup.string().required('Gender is required'),
  agreement: Yup.boolean()
    .oneOf([true], 'You should accept the terms and conditions')
    .required('You should accept the terms and conditions'),
  image: Yup.mixed<FileList>()
    .required('Image is required')
    .test('fileSize', 'The file should be less than 2 mb', (value) => {
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
  country: Yup.string()
    .trim()
    .required('Country is required')
    .test('is-valid-country', 'Should select a country from the list', (value) => {
      if (!value) return false;
      return countries.includes(value);
    }),
});
export default validationSchema;
