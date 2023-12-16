import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from 'store/authSlice';
import Button from '../Shared/Button';
import Input from '../Shared/Input';
import LoginwithGoogle from '../LoginwithGoogle';
import { LoginpopHandle, forgetPasswordpopupHandle,GoBacktoLogin} from 'store/authSlice';
import './login.css';

const PopupForm = ({loginRef}) => {
  const [logininfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const { isLoggedin, loginOpen, error,forgetPassword} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
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
    dispatch(forgetPasswordpopupHandle());
  }
  
  const forgetPasswordAPI=()=>{
     console.log("forgetPasswrodAPI");
  }

  const BacktoLogin=()=>{
    dispatch(GoBacktoLogin());
  }

  return (
    <>
      <Button className="open-btn" id="login-open" onClick={togglePopup} children="Login" />
      {loginOpen && (
        <div className="popup" id="login-content" ref={loginRef}>
          <div className="popup-content">
            <h2>{!forgetPassword?.forgetPassPopup ? "Login" : "Reset Password"}</h2>
            {error && <p id="login-contnet">{error}</p>}
            <form onSubmit={handleSubmit}>  
              <label htmlFor="email">Email:</label>
              <Input type="email" autoComplete='off' value={logininfo.email}
                onChange={handleInput} name='email'  width="270px" required />
              {!forgetPassword?.forgetPassPopup?<>
                <label htmlFor="password">Password:</label>
                <Input type='password' autoComplete='off' value={logininfo.password}
                  onChange={handleInput} name='password'  width="270px" required />
                <p className='forget-link' onClick={handleForgetPass}>forget password?</p>
                <LoginwithGoogle />
                <Link className='forget-link' to="/registration" id="registration-redirect" onClick={togglePopup}>Signup</Link>
              </>:
               <p className="back-login" onClick={BacktoLogin}>Go Back to Login</p>
              }
              <div className='button-section'>
                <Button onClick={togglePopup} children="Close" backgroundColor="#bdbcbc" height="40px" />
                {!forgetPassword?.forgetPassPopup ? <Button type="submit"  onClick={handleSubmit} chidren="Submit" height="40px" children="Submit" /> :
                  <Button type="submit"  onClick={forgetPasswordAPI} chidren="Submit" height="40px" children="Submit" />
                }
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupForm;
