import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, string, number, date, InferType } from 'yup';

const loginSchema = string().required();
const passwordSchema = string().required();


export const LoginForm = () => {
    return (
        <Formik
            className="col-12 col-md-6 mt-3 mt-md-0"
            initialValues={{ login: '', password: '' }}
            // validate={}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            {({ isSubmitting }) => (              
                <Form>
                    <h1 className="text-center mb-4">
                        Войти
                    </h1>
                    <div className="form-floating mb-3">
                        <Field id="loginInput" type="login" name="loginInput" className="form-control" />
                        <label htmlFor="loginInput">Ваш ник</label>
                        <ErrorMessage name="login" component="div" />
                    </div>
                    <label htmlFor="password">Пароль</label>
                    <Field id="password" type="password" name="password" className="form-control" />
                    <ErrorMessage name="password" component="div" />
                    <button type="submit" disabled={isSubmitting} className="w-100 mb-3 btn btn-outline-primary">
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    )
}

{/* <form className="col-12 col-md-6 mt-3 mt-md-0">
    <h1 className="text-center mb-4">
        Войти
    </h1>
    <div className="form-floating mb-3">
        <input name="username" autoComplete="username" required="" placeholder="Ваш ник" id="username" className="form-control" value="" />
        <label htmlFor="username">
            Ваш ник
        </label>
    </div>
    <div className="form-floating mb-4">
        <input name="password" autoComplete="current-password" required="" placeholder="Пароль" type="password" id="password" className="form-control" value="" />
        <label className="form-label" htmlFor="password">
            Пароль
        </label>
    </div>
    <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
        Войти
    </button>
</form> */}