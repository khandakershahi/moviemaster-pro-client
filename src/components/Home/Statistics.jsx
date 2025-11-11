import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';

const Statistics = () => {

    const [length, setLength] = useState('')

    const axiosMain = useAxios();

        useEffect(() => {
            axiosMain.get('/movies')
                .then(res => {
                    // console.log('lenght data', res.data.length);
                    setLength(res.data.length);
                })
        }, [axiosMain])

    return (
        <div className='max-w-7xl mx-auto flex justify-around items-center py-10'>
            <div className='shadow-2xl border border-secondary w-96 flex flex-col justify-center items-center h-48 rounded-4xl'>
                <p className='text-7xl font-black text-primary'>{length }</p>
                <p className='text-2xl font-bold'>Total Movies</p>
            </div>
            <div className='shadow-2xl border border-secondary w-96 flex flex-col justify-center items-center h-48 rounded-4xl'>
                <p className='text-7xl font-black text-primary'>20</p>
                <p className='text-2xl font-bold'>Total Users</p>
            </div>
        </div>
    );
};

export default Statistics;