import React from 'react';
import {Outlet} from 'react-router-dom';
import Footer from 'component/Footer';
import Navbar from 'component/NavHome';

const Homepage = () => {
    return (
        <>
       <Navbar />
       <Outlet />
       <Footer />
        </>
    )
}

export default Homepage;