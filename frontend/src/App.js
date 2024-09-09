import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import  PageNotFound  from './components/PageNotFound.jsx';
import { MainPage } from './components/MainPage.jsx';
import { Login } from './components/Login.jsx';

const PrivateRoute = ({ children }) => {
  const token = window.localStorage.getItem('JWT');
  return token ? children : <Navigate to="/login" />;
};
const AuthRoute = ({ children }) => {
  const token = window.localStorage.getItem('JWT');
  return token ? <Navigate to="/" /> : children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<PrivateRoute><MainPage /></PrivateRoute>} />
        <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
