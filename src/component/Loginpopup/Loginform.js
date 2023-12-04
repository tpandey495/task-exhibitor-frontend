import React, { useState,useEffect, useRef } from 'react';
import { Navigate, useNavigate,useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loginUser,setToken as setTokenAction} from 'store/authSlice';
import { Link } from 'react-router-dom';
import './login.css';

const PopupForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [err, setErr] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [token,setToken ]=useState(searchParams.get('token'));

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  useEffect(()=>{
    console.log(token);
    if(token && !localStorage.getItem("user"))
      dispatch(setTokenAction(token));
  },[token])
  
  const errRef = useRef();
  const navigate = useNavigate();
  const errMsg = "";
  const [logindet, setLogin] = useState({
    email: "",
    password: "",
  });

  const { isLoggedIn, user } = useSelector((state) => state.auth);


  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLogin({ ...logindet, [name]: value });
  }

  const { email, password } = logindet;
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload = {
      email: email,
      password: password
    }
  await  dispatch(loginUser(payload))
      .unwrap()
      .then(() => {
        navigate("/");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // LoginwithGoogle
  const LoginwithGoogle=async(e)=>{
    e.preventDefault();
    window.location.href = 'http://localhost:9000/api/users/google';
   }

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <button className="open-btn" onClick={togglePopup}>Login</button>
      {isOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>Login</h2>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email:</label>
              <input type="email"
                autoComplete='off'
                value={logindet.email}
                onChange={handleInput}
                name='email'
                id='email' />
              <label htmlFor="password">Password:</label>
              <input type='password'
                autoComplete='off'
                value={logindet.password}
                onChange={handleInput}
                name='password'
                id='password' />
              <a href='#' className='forget-link'>forget password?</a>
              <button className='long-button' onClick={LoginwithGoogle}>Login with Google</button>
              <Link className='forget-link' to="/registration">Signup</Link>
              <div className='button-section'>
                <button className="close-btn" onClick={togglePopup}>
                  Close
                </button>
                <button type="submit" onClick={handleSubmit}>Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupForm;
