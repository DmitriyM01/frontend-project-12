import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import { toastError } from './toasts/index.js';

import { actions as AuthorizationActions } from '../slices/authorizationSlice.js';
import { loginSchema } from '../schemas/schemas.js';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{
        login: '',
        password: '',
      }}
      onSubmit={async (values) => {
        // Здесь будет логика отправки данных на сервер
        try {
          const response = await axios.post('/api/v1/login', { username: values.login, password: values.password });
          const { username, token } = response.data;
          window.localStorage.setItem('JWT', token);
          window.localStorage.setItem('username', username);
          dispatch(AuthorizationActions.setAuthorization({ isAuthorized: 'Authorized', username, token }));
          navigate('/');
        } catch (err) {
          // const errMessage = err.message;
          const errCode = err.status;
          if (errCode === 401) toastError(t('errors.auth'));
          if (err.code === 'ERR_NETWORK') toastError(t('errors.network'));
          console.log(err);
        }
        // actions.setSubmitting(false);
      }}
      validationSchema={loginSchema}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="col-12 col-md-6 mt-3 mt-md-0">
          <h1 className="text-center mb-4">{t('signIn')}</h1>
          <div className="form-floating mb-3">
            <Field
              id="login"
              type="text"
              name="login"
              placeholder="Login"
              className={`form-control${touched.login && errors.login ? ' is-invalid' : ''}`}
            />
            <label htmlFor="login">{t('user.nickname')}</label>
            <ErrorMessage className="invalid-feedback" name="login" component="div" />
          </div>
          <div className="form-floating mb-3">
            <Field
              id="floatingPassword"
              type="text"
              name="password"
              placeholder="Password"
              className={`form-control${touched.password && errors.password ? ' is-invalid' : ''}`}
            />
            <label htmlFor="floatingPassword">{t('user.password')}</label>
            <ErrorMessage className="invalid-feedback" name="password" component="div" />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-100 mb-3 btn btn-outline-primary"
          >
            {t('buttons.logon')}
          </button>
        </Form>
      )}
    </Formik>
  );
};

const Login = () => {
  const { t } = useTranslation();

  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
              <Link className="navbar-brand" to="/">Hexlet Chat</Link>
            </div>
          </nav>
          <div className="container-fluid h-100">
            <div className="h-100 row justify-content-center align-content-center h-100">
              <div className="col-12 col-md-8 col-xxl-6">
                <div className="card shadow-sm">
                  <div className="card-body row p-5">
                    <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                      <img
                        src="./chat-logo.png"
                        className="border-0 img-thumbnail rounded-circle"
                        alt="Войти"
                      />
                    </div>
                    <LoginForm />
                  </div>
                  <div className="card-footer p-4">
                    <div className="text-center">
                      <span>{t('questions.noAccount')}</span>
                      <Link to="/signup">{t('registration')}</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
