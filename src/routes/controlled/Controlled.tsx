import { yupResolver } from '@hookform/resolvers/yup';
import type { ReactElement } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm, useFormState } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import SelectCountries from './Select-countries';
import { useAppDispatch } from '../../hooks';
import { addForm } from '../../store/formsSlice';
import styles from '../../styles/form.module.scss';
import type { IFormValues } from '../../types/formTypes';
import stylesBtn from '../../UI/button/_button.module.scss';
import { PassStrength } from '../../UI/Pass-strength';
import convertToBase64 from '../../utils/convertToBase64';
import validationSchema from '../../utils/validation';

const Controlled = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { control, register, handleSubmit, reset } = useForm<IFormValues>({
    mode: 'all',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      age: '',
      email: '',
      pass: '',
      confirmPass: '',
      gender: '',
      agreement: false,
      country: '',
    },
  });

  const { errors, isValid } = useFormState({
    control,
  });

  const submitHandler: SubmitHandler<IFormValues> = async (data): Promise<void> => {
    const file = data.image[0];
    if (file) {
      const base64 = await convertToBase64(file);
      const newData = { id: crypto.randomUUID(), form: 'Controlled form', ...data, image: base64 };
      dispatch(addForm(newData));
    }
    reset();
    navigate('/');
  };

  return (
    <section className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
        <label className={styles.text_label} htmlFor="name">
          Name
          <input {...register('name')} className={styles.input} type="text" />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </label>
        <label className={styles.text_label} htmlFor="age">
          Age
          <input {...register('age')} className={styles.input} type="text" />
          {errors.age && <p className={styles.error}>{errors.age.message}</p>}
        </label>
        <label className={styles.text_label} htmlFor="email">
          Email
          <input {...register('email')} className={styles.input} type="email" />
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
        </label>
        <label className={styles.text_label} htmlFor="pass">
          Password
          <input {...register('pass')} className={styles.input} type="password" />
          <Controller name="pass" control={control} render={({ field: { value } }) => <PassStrength value={value} />} />
          {errors.pass && <p className={styles.error}>{errors.pass.message}</p>}
        </label>
        <label className={styles.text_label} htmlFor="confirmPass">
          Confirm Password
          <input {...register('confirmPass')} className={styles.input} type="password" />
          {errors.confirmPass && <p className={styles.error}>{errors.confirmPass.message}</p>}
        </label>
        <div className={styles.gender_wrapper}>
          <h3 className={styles.gender_title}>Gender</h3>
          <label className={styles.text_label} htmlFor="female">
            Female
            <input {...register('gender')} className={styles.input} type="radio" value="female" />
          </label>
          <label className={styles.text_label} htmlFor="male">
            Male
            <input {...register('gender')} className={styles.input} type="radio" value="male" />
          </label>
          {errors.gender && <p className={styles.error}>{errors.gender.message}</p>}
        </div>
        <label className={styles.text_label} htmlFor="agreement">
          Accept Terms and Conditions agreement
          <input {...register('agreement')} className={styles.input} type="checkbox" />
          {errors.agreement && <p className={styles.error}>{errors.agreement.message}</p>}
        </label>
        <label className={styles.text_label} htmlFor="image">
          Upload picture
          <input {...register('image')} className={styles.input} type="file" />
          {errors.image && <p className={styles.error}>{errors.image.message}</p>}
        </label>
        <Controller
          name="country"
          control={control}
          render={({ field: { onChange, value } }) => (
            <SelectCountries onChange={onChange} value={value} errors={errors} />
          )}
        />
        <button className={stylesBtn.button} type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
    </section>
  );
};

export default Controlled;
