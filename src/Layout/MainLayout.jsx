import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer/Footer';
import { Toaster } from 'react-hot-toast';

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet> </Outlet>
            <Footer></Footer>
            <Toaster />
        </div>
    );
};

export default MainLayout;