import React from 'react';
import { Link } from 'react-router';

const Error404 = () => {
    return (
        <div className='w-auto lg:w-7xl
         mx-auto p-4 lg:p-0'>
            <div className='flex flex-col justify-center items-center  h-[70vh] gap-8'>
                <h2 className='text-5xl font-bold text-primary'>Page not found.</h2>
                <h3 className='text-5xl font-bold text-secondary'>404</h3>
                <Link to="/" className='btn btn-primary'>Home</Link>
            </div>
        </div>
    );
};

export default Error404;