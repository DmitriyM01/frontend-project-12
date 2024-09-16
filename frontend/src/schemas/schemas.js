import * as yup from 'yup';

export const signupSchema = yup.object().shape({
  username: yup.string()
    .matches(/^[a-z\d]+$/gi, 'latin')
    .min(3, 'Минимум 3 символа')
    .max(20, 'Максимум 20 символов')
    .required("Это обязательное поле"),
  password: yup.string()
    .matches(/^[a-z\d@$!%*#?&]+$/gi, 'validPassword')
    .min(6, 'Минимум 6 символов')
    .max(20, 'Максимум 20 символов')
    .required("Это обязательное поле"),
  confirmPassword: yup.string().required("Это обязательное поле").oneOf([yup.ref('password'), null], 'Пароль должен совпадать'),
});
