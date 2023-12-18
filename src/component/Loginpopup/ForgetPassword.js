import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Button from '../Shared/Button';
import Input from '../Shared/Input';
import {LoginpopHandle,forgetPasswordAPI, GoBacktoLogin } from 'store/authSlice';
import './login.css';

const PopupForm = ({ loginRef }) => {
  const dispatch = useDispatch();
  const {forgetPassword } = useSelector((state) => state.auth);
  const [logininfo, setLoginInfo] = useState({
    email: "",
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
      userEmail: logininfo.email,
    }
    await dispatch(forgetPasswordAPI(payload));
  };

  const togglePopup = (e) => {
    dispatch(LoginpopHandle());
  };

  const BacktoLogin = () => {
    dispatch(GoBacktoLogin());
  }

  return (
    <>
        <div className="popup" id="login-content" ref={loginRef}>
          <div className="popup-content">
            <h2>Reset Password</h2>
            {forgetPassword?.error && <p id="login-content">{forgetPassword?.error}</p>}
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email:</label>
              <Input type="email" autoComplete='off' value={logininfo.email}
                onChange={handleInput} name='email' width="270px" required />
              <p className="back-login" onClick={BacktoLogin}>Go Back to Login</p>
              <div className='button-section'>
                <Button onClick={togglePopup} children="Close" backgroundColor="#bdbcbc" height="40px" />
                <Button type="submit" onClick={forgetPasswordAPI} chidren="Submit" height="40px" children="Submit" />
              </div>
            </form>
          </div>
        </div>
    </>
  );
};

export default PopupForm;
