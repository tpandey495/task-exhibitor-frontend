import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Button from '../Shared/Button';
import Input from '../Shared/Input';
import LoginwithGoogle from '../LoginwithGoogle';
import {loginUser,LoginpopHandle, forgetpassPopOpen} from 'store/authSlice';
import './login.css';
import  ForgetPasswordPopup  from './ForgetPassword';


const PopupForm = ({ loginRef }) => {
  const { isLoggedin, loginOpen, error, forgetPassword } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [logininfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  
  //Login using email id and password logic
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginInfo({ ...logininfo, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload = {
      email: logininfo.email,
      password: logininfo.password
    }
    await dispatch(loginUser(payload));
    if (isLoggedin)
      dispatch(LoginpopHandle());
  };

  const togglePopup = (e) => {
    dispatch(LoginpopHandle());
  };

  const handleForgetPass = (e) => {
    dispatch(forgetpassPopOpen());
  }

  return (
    <>
    <Button className="open-btn" id="login-open" onClick={togglePopup} children="Login" />
    {loginOpen && (
      !forgetPassword.forgetPassPopup ? (
        <div className="popup" id="login-content" ref={loginRef}>
          <div className="popup-content">
            <h2>Login</h2>
            {error && <p id="login-content">{error}</p>}
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email:</label>
              <Input type="email" autoComplete='off' value={logininfo.email}
                onChange={handleInput} name='email' width="270px" required />
              <label htmlFor="password">Password:</label>
              <Input type='password' autoComplete='off' value={logininfo.password}
                onChange={handleInput} name='password' width="270px" required />
              <p className='forget-link' onClick={handleForgetPass}>forget password?</p>
              <LoginwithGoogle />
              <Link className='forget-link' to="/registration" id="registration-redirect" onClick={togglePopup}>Signup</Link>
              <div className='button-section'>
                <Button onClick={togglePopup} children="Close" backgroundColor="#bdbcbc" height="40px" />
                <Button type="submit" onClick={handleSubmit} children="Submit" height="40px" />
              </div>
            </form>
          </div>
        </div>
      ) : (
        <ForgetPasswordPopup />
      ) 
    )}
  </>
  );
};

export default PopupForm;
