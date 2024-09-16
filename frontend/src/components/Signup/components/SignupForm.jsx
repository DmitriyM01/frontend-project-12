import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { actions as AuthorizationActions } from '../../../slices/authorizationSlice.js';
import { signupSchema  } from "../../../schemas/schemas.js";
import { useTranslation } from 'react-i18next';

export const SignupForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <Formik
            initialValues={{
                username: '',
                password: '',
                confirmPassword: ''
            }}
            onSubmit={async (values, actions) => {
                // Здесь будет логика отправки данных на сервер
                try {
                    console.log(values)
                    const response = await axios.post('/api/v1/signup', { username: values.username, password: values.password });
                    const { username, token } = response.data;
                    window.localStorage.setItem("JWT", token);
                    window.localStorage.setItem("username", username);
                    dispatch(AuthorizationActions.setAuthorization({ isAuthorized: 'Authorized', username: username, token: token }))
                    navigate("/");
                    
                } catch(err) {
                    const errMessage = err.message;
                    const errCode = err.status
                    if (errCode === 409) alert('Данный пользователь уже зарегестрирован')
                    console.log(errMessage)
                }
                // actions.setSubmitting(false);
            }}
            validationSchema={signupSchema}
        >
            {({ errors, touched, isSubmitting }) => (              
                <Form className="col-12 col-md-6 mt-3 mt-md-0">
                    <h1 className="text-center mb-4">{t('registration')}</h1>
                    <div className="form-floating mb-3">
                        <Field 
                            id="username" 
                            type="text" 
                            name="username" 
                            placeholder="Username" 
                            className={`form-control${touched.username && errors.username ? " is-invalid" : ""}`}
                        />
                        <label htmlFor="username">{t('user.username')}</label>
                        <ErrorMessage className="invalid-feedback" name="username" component="div" />
                    </div>                 
                    <div className="form-floating mb-3">
                        <Field 
                            id='floatingPassword' 
                            type="text" 
                            name="password" 
                            placeholder="Password" 
                            className={`form-control${touched.password && errors.password ? " is-invalid" : ""}`}
                        />
                        <label htmlFor="floatingPassword">{t('user.password')}</label>
                        <ErrorMessage className="invalid-feedback" name="password" component="div" />
                    </div>
                    <div className="form-floating mb-3">
                        <Field 
                            id='confirmPassword' 
                            type="text" 
                            name="confirmPassword" 
                            placeholder="confirmPassword" 
                            className={`form-control${touched.confirmPassword && errors.confirmPassword ? " is-invalid" : ""}`}
                        />
                        <label htmlFor="confirmPassword">{t('user.confirmPassword')}</label>
                        <ErrorMessage className="invalid-feedback" name="confirmPassword" component="div" />
                    </div>
                    <button 
                        type="submit" 
                        // disabled={isSubmitting} 
                        className="w-100 mb-3 btn btn-outline-primary"
                    >
                        {t('buttons.registration')}
                    </button>
                </Form>
            )}
        </Formik>
    )
}