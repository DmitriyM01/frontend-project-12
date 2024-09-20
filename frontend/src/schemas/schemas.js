import * as yup from 'yup';

export const signupSchema = yup.object().shape({
  username: yup.string()
    .matches(/^[a-z\d]+$/gi, 'latin')
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .required("Это обязательное поле"),
  password: yup.string()
    .matches(/^[a-z\d@$!%*#?&]+$/gi, 'validPassword')
    .min(6, 'От 6 до 20 символов')
    .max(20, 'От 6 до 20 символов')
    .required("Это обязательное поле"),
  confirmPassword: yup.string().required("Это обязательное поле").oneOf([yup.ref('password'), null], 'Пароли должен совпадать'),
});
