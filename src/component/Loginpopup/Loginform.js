  import React, { useState,useEffect} from 'react';
  import {useLocation,Link} from 'react-router-dom';
  import { useDispatch, useSelector } from "react-redux";
  import { loginUser,setToken as setTokenAction} from 'store/authSlice';
  import Button from '../Shared/Button';
  import Input from '../Shared/Input';
  import {Base_URL} from 'utils/constant';
  import './login.css';

  const PopupForm = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [logininfo,setLoginInfo] = useState({
      email: "",
      password: "",
    });
    const {isLoggedin,error} = useSelector((state) => state.auth);
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
      if(isLoggedin)
        setIsOpen(false);
    };

    const togglePopup = (e) => {
      setIsOpen(!isOpen);
    };

    return (
      <>
        <Button className="open-btn" id="login-open" onClick={togglePopup} children="Login"  />
        {isOpen && (
          <div className="popup" id="login-content">
            <div className="popup-content"  id="login-content">
              <h2  id="login-content">Login</h2>
              {error&&<p  id="login-contnet">{error}</p>}
              <form onSubmit={handleSubmit}>
                <label htmlFor="email" id="login-content">Email:</label>
                <Input type="email" autoComplete='off' value={logininfo.email}
                  onChange={handleInput} name='email' id='email' width="270px" required/>
                <label  htmlFor="password" id="login-content">Password:</label>
                <Input type='password' autoComplete='off' value={logininfo.password} 
                  onChange={handleInput} name='password' id='password' width="270px" required />
                <Link to="/forget" className='forget-link'>forget password?</Link>
                <Button type="button" className='long-button' onClick={LoginwithGoogle} children="Login with Google" width="270px" />
                <Link className='forget-link' to="/registration">Signup</Link>
                <div className='button-section' id="login-content">
                  <Button onClick={togglePopup} children="Close" backgroundColor="#bdbcbc" height="40px"/>
                  <Button type="submit" id="submit" onClick={handleSubmit} chidren="Submit" height="40px"  children="Submit"/>
                </div>
              </form>
            </div>
          </div>
        )}
      </>
    );
  };

  export default PopupForm;
