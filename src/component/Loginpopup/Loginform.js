  import React, { useState,useEffect} from 'react';
  import {useLocation,Link} from 'react-router-dom';
  import { useDispatch, useSelector } from "react-redux";
  import { loginUser,setToken as setTokenAction} from 'store/authSlice';
  import Button from '../Shared/Button';
  import {Base_URL} from 'utils/constant';
  import './login.css';

  const PopupForm = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [logininfo,setLoginInfo] = useState({
      email: "",
      password: "",
    });
    const dispatch = useDispatch();
    //In case of login with google after redirect reading token from url  
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [token,setToken ]=useState(searchParams.get('token'));
    //Whenever token changes rendering the ui to dispatch action to set token 
    useEffect(()=>{
      if(token && !localStorage.getItem("user"))
        dispatch(setTokenAction(token));
    },[token])
    // LoginwithGoogle
    const LoginwithGoogle=async(e)=>{
      e.preventDefault();
      window.location.href = `${Base_URL}/users/google`;
    }
    //Login using email id and password logic
    const handleInput = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setLoginInfo({ ...logininfo, [name]: value });
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      let payload = {
        email:logininfo.email,
        password:logininfo.password
      }
      await  dispatch(loginUser(payload));
      window.location.reload();
    };

    const togglePopup = () => {
      setIsOpen(!isOpen);
    };

    return (
      <>
        <Button className="open-btn" onClick={togglePopup} children="Login"  />
        {isOpen && (
          <div className="popup">
            <div className="popup-content">
              <h2>Login</h2>
              {/* <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p> */}
              <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input type="email" autoComplete='off' value={logininfo.email}
                  onChange={handleInput} name='email' id='email' />
                <label htmlFor="password">Password:</label>
                <input type='password' autoComplete='off' value={logininfo.password} 
                onChange={handleInput} name='password' id='password' />
                <a href='#' className='forget-link'>forget password?</a>
                <Button type="button" className='long-button' onClick={LoginwithGoogle} children="Login with Google" width="320px" />
                <Link className='forget-link' to="/registration">Signup</Link>
                <div className='button-section'>
                  <Button onClick={togglePopup} children="Close" backgroundColor="#bdbcbc" height="40px"/>
                  <Button type="submit" onClick={handleSubmit} chidren="Submit" height="40px"  children="Submit"/>
                </div>
              </form>
            </div>
          </div>
        )}
      </>
    );
  };

  export default PopupForm;
