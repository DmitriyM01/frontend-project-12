import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export const MainPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = window.localStorage.getItem("JWT");
    if (!token) navigate('/login')
  }, [])
  return (
    <nav>
    <ul>
      <li>
        <Link to="/one">Page One</Link>
      </li>
      <li>
        <Link to="/two">Page Two</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  </nav>
  )
};