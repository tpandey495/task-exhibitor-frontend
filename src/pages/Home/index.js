import React from 'react';
import {Outlet} from 'react-router-dom';
import Header from 'component/Header';
import About from 'component/About';
import Feature from 'component/Feature';
import Testinomial from 'component/Testinomail';

const Homepage = () => {
    return (
        <>
       <Header />
       <About />
       <Feature />
       <Testinomial />
        </>
    )
}

export default Homepage;