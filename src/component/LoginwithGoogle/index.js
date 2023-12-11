import React,{useState,useEffect} from 'react';
import { useDispatch} from "react-redux";
import {useSearchParams} from 'react-router-dom';
import {setToken as setTokenAction} from 'store/authSlice';
import Button from '../Shared/Button';
import {Base_URL} from 'utils/constant';

const Login = () => {
    const dispatch = useDispatch();
    //In case of login with google after redirect reading token from url  
    const [params]=useSearchParams();
    const token=params.get("token");
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
  return (
    <>
       <Button type="button" className='long-button' onClick={LoginwithGoogle} children="Login with Google" width="270px" />
    </>
  )
}

export default Login;

