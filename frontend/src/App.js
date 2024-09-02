import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  PageNotFound  from './components/PageNotFound.jsx';
import { MainPage } from './components/MainPage.jsx';
import { Login } from './components/Login.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
