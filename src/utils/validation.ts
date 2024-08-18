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
    .test('is-valid-age', 'Age should be a positive number', (value) => {
      if (!value) return false;
      const parsedValue = Number(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      return !Number.isNaN(parsedValue) && parsedValue > 0 && Number.isInteger(parsedValue) && !hasSpecialChar;
    })
    .required('Age is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  pass: Yup.string()
    .test('strength', 'Password is too weak', (value) => {
      if (!value) return false;
      const hasUppercase = /[A-ZА-Я]/.test(value);
      const hasLowercase = /[a-zа-я]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      return hasNumber && hasUppercase && hasLowercase && hasSpecialChar;
    })
    .required('Password is required'),
  confirmPass: Yup.string()
    .oneOf([Yup.ref('pass')], 'Passwords should match')
    .required('Confirm Password is required'),
  gender: Yup.string().required('Gender is required'),
  agreement: Yup.boolean()
    .oneOf([true], 'You should accept terms and conditions')
    .required('You should accept terms and conditions'),
  image: Yup.mixed<FileList>()
    .test('fileSize', 'The file should be less than 2 mb', (value) => {
      if (!value) return false;
      const file = value[0];
      if (!file || !(file instanceof File)) return false;
      if (!file) return false;
      return file.size <= MAX_SIZE;
    })
    .test('fileType', 'Invalid file type, need jpeg or png', (value) => {
      if (!value) return false;
      const file = value[0];
      if (!file || !(file instanceof File)) return false;
      if (!file) return false;
      return ['image/jpeg', 'image/png'].includes(file.type);
    })
    .required('Image is required'),
  country: Yup.string()
    .trim()
    .test('is-valid-country', 'Should select a country from the list', (value) => {
      if (!value) return false;
      return countries.includes(value);
    })
    .required('Country is required'),
});
export default validationSchema;
