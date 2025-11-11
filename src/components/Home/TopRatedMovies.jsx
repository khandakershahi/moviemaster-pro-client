import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { FaStar } from 'react-icons/fa';

const TopRatedMovies = () => {

    const [topMvoies, setTopMovies] = useState([]);

    const axiosTopMovie = useAxios()

    useEffect(() => {
        axiosTopMovie.get('/movie-toprated')
            .then(res => {
                // console.log('slider data', res.data);
                setTopMovies(res.data);
            })
    }, [axiosTopMovie])

    return (
        <div className='max-w-7xl mx-auto py-10'>
            <div className='flex flex-col gap-4'>
                <h2 className='top5 text-2xl flex items-center gap-3'>Top Rated Movies</h2>
                <div className='flex flex-row justify-between'>
                    {
                        topMvoies.map((movie, _id) =>
                            <div key={_id}
                                style={{
                                    backgroundImage: `url(${movie.posterUrl})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    height: '300px',
                                    width: '200px',
                                    position: 'relative',
                                    color: 'white',

                                }}


                            >
                                <div className="absolute inset-0 bg-black/30"></div>
                                <div className='absolute bottom-0 px-2'>
                                    <span className=' text-xs font-medium text-yellow-500 flex gap-1 items-center'> <FaStar className='text-yellow-500' />{movie.rating}</span>
                                    <p>{movie.title}</p>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default TopRatedMovies;