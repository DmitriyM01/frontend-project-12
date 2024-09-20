import { SignupForm } from "./components/SignupForm";
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

export const Signup = () => {
    return (
        <div className="h-100">
            <div className="h-100" id="chat">
                <div className="d-flex flex-column h-100">
                    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
                        <div className="container">
                            <Link className="navbar-brand" to='/'>{'Hexlet Chat'}</ Link>
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
                                        <SignupForm />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}

