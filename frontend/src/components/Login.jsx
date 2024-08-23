import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as yup from 'yup';
import { useRef, useEffect } from 'react'

const loginSchema = yup.object().shape({
    login: yup.string()
    .required('Это обязательное поле')
    .min(2, 'Минимум 2 символа')
    .max(20, 'Максимум 20 символов'),
    password: yup.string()
    .required('Это обязательное поле')
    .min(8, 'Минимум 8 символов')
    .max(20, 'Максимум 20 символов'),
})


const LoginForm = () => {
    return (
        <Formik
            initialValues={{
                login: '',
                password: '',
            }}
            onSubmit={(values, actions) => {
                // Здесь будет логика отправки данных на сервер
                console.log(values)
                // actions.setSubmitting(false);
            }}
            validationSchema={loginSchema}
        >
            {({ errors, touched, isSubmitting }) => (              
                <Form className="col-12 col-md-6 mt-3 mt-md-0">
                    <h1 className="text-center mb-4">Войти</h1>
                    <div className="form-floating mb-3">
                        <Field 
                            id="login" 
                            type="text" 
                            name="login" 
                            placeholder="Login" 
                            className={`form-control${touched.login && errors.login ? " is-invalid" : ""}`}
                        />
                        <label htmlFor="login">Ваш ник</label>
                        <ErrorMessage className="invalid-feedback" name="login" component="div" />
                    </div>                 
                    <div className="form-floating mb-3">
                        <Field 
                            id='floatingPassword' 
                            type="text" 
                            name="password" 
                            placeholder="Password" 
                            className={`form-control${touched.password && errors.password ? " is-invalid" : ""}`}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                        <ErrorMessage className="invalid-feedback" name="password" component="div" />
                    </div>
                    <button 
                        type="submit" 
                        // disabled={isSubmitting} 
                        className="w-100 mb-3 btn btn-outline-primary"
                    >
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    )
}


export const Login = () => {
    return (
        <div className="h-100">
            <div className="h-100" id="chat">
                <div className="d-flex flex-column h-100">
                    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
                        <div className="container">
                            <a className="navbar-brand" href="/">Mini Chat</a>
                            {/* <button type="button" className="btn btn-primary">
                                Выйти
                            </button> */}
                        </div>
                    </nav>
                    <div className="container-fluid h-100">
                        <div className="h-100 pt-5 row justify-content-center align-content-center h-100">
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
                                            <span>Нет аккаунта?</span>
                                            <a href="/signup">Регистрация</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Toastify"></div>
            </div>
        </div>
    )
}

