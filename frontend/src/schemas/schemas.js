import * as yup from 'yup';

export default yup.object().shape({
  username: yup.string()
    .matches(/^[a-z\d]+$/gi, 'latin')
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .required('Это обязательное поле'),
  password: yup.string()
    .matches(/^[a-z\d@$!%*#?&]+$/gi, 'validPassword')
    .min(6, 'Не менее 6 символов')
    .max(20, 'От 6 до 20 символов')
    .required('Это обязательное поле'),
  confirmPassword: yup.string().required('Это обязательное поле').oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
});

export const loginSchema = yup.object().shape({
  login: yup.string()
    .required('Это обязательное поле')
    .min(3, 'Минимум 3 символа')
    .max(20, 'Максимум 20 символов'),
  password: yup.string()
    .required('Это обязательное поле')
    .min(4, 'Минимум 4 символа')
    .max(20, 'Максимум 20 символов'),
});
