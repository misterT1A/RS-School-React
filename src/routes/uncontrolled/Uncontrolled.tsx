import { useRef, useState, type ReactElement } from 'react';
import * as Yup from 'yup';

import SelectCountries from './Select-countries';
import { useAppDispatch } from '../../hooks';
import { addForm } from '../../store/controlledSlice';
import styles from '../../styles/form.module.scss';
import stylesBtn from '../../UI/button/_button.module.scss';
import { PassStrengthWithRef } from '../../UI/Pass-strength';
import convertToBase64 from '../../utils/convertToBase64';
import validationSchema from '../../utils/validation';

const Uncontrolled = (): ReactElement => {
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);

    const file = formData.get('image') as File;

    const formValues = {
      name: (formData.get('name') as string) || '',
      age: (formData.get('age') as string) || '',
      pass: (formData.get('pass') as string) || '',
      confirmPass: (formData.get('confirmPass') as string) || '',
      gender: (formData.get('gender') as string) || '',
      agreement: formData.get('agreement') === 'on' || false,
      country: (formData.get('country') as string) || '',
      image: [file],
    };

    try {
      await validationSchema.validate(formValues, { abortEarly: false });
      const base64 = await convertToBase64(file);
      const NewValues = { form: 'Uncontrolled form', ...formValues, image: base64 };

      dispatch(addForm(NewValues));
      setErrors({});
    } catch (validationErrors) {
      if (validationErrors instanceof Yup.ValidationError) {
        const validationErrorsObject: Record<string, string> = {};
        (validationErrors as Yup.ValidationError).inner.forEach((error) => {
          if (error.path) {
            validationErrorsObject[error.path] = error.message;
          }
        });
        setErrors(validationErrorsObject);
      }
    }
  };

  return (
    <section className={styles.wrapper}>
      <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.text_label} htmlFor="name">
          Name
          <input className={styles.input} type="text" name="name" />
          {errors.name && <p className={styles.error}>{errors.name}</p>}
        </label>
        <label className={styles.text_label} htmlFor="age">
          Age
          <input className={styles.input} type="text" name="age" />
          {errors.age && <p className={styles.error}>{errors.age}</p>}
        </label>
        <label className={styles.text_label} htmlFor="pass">
          Password
          <input className={styles.input} type="password" name="pass" />
          <PassStrengthWithRef refform={formRef} />
          {errors.pass && <p className={styles.error}>{errors.pass}</p>}
        </label>
        <label className={styles.text_label} htmlFor="confirmPass">
          Confirm Password
          <input className={styles.input} type="password" name="confirmPass" />
          {errors.confirmPass && <p className={styles.error}>{errors.confirmPass}</p>}
        </label>
        <div className={styles.gender_wrapper}>
          <h3 className={styles.gender_title}>Gender</h3>
          <label className={styles.text_label} htmlFor="female">
            Female
            <input className={styles.input} type="radio" value="female" name="gender" />
          </label>
          <label className={styles.text_label} htmlFor="male">
            Male
            <input className={styles.input} type="radio" value="male" name="gender" />
          </label>
          {errors.gender && <p className={styles.error}>{errors.gender}</p>}
        </div>
        <label className={styles.text_label} htmlFor="agreement">
          Accept Terms and Conditions agreement
          <input className={styles.input} type="checkbox" name="agreement" />
          {errors.agreement && <p className={styles.error}>{errors.agreement}</p>}
        </label>
        <label className={styles.text_label} htmlFor="image">
          Upload picture
          <input className={styles.input} type="file" name="image" />
          {errors.image && <p className={styles.error}>{errors.image}</p>}
        </label>
        <SelectCountries name="country" error={errors} />
        <button className={stylesBtn.button} type="submit">
          Submit
        </button>
      </form>
    </section>
  );
};

export default Uncontrolled;
