import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import { FaPlay, FaStar } from 'react-icons/fa';
import { FiInfo } from 'react-icons/fi';
import { useNavigate } from 'react-router';
import useAxios from '../../hooks/useAxios';


const Hero = () => {

    const [sliderData, setSliderData] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosMain = useAxios();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axiosMain.get('/movie-slider')
            .then(res => {
                // console.log('slider data', res.data);
                setSliderData(res.data);
            })
            .finally(() => setLoading(false));
    }, [axiosMain])

    if (loading) {
        return (
            <div className="relative w-full bg-base-300 animate-pulse" style={{ height: '82vh' }}>
                <div className="absolute inset-0 flex flex-col justify-center items-start px-10 gap-4 max-w-7xl mx-auto">
                    <div className="skeleton h-10 w-96"></div>
                    <div className="flex gap-3">
                        <div className="skeleton h-8 w-24"></div>
                        <div className="skeleton h-8 w-20"></div>
                        <div className="skeleton h-8 w-28"></div>
                    </div>
                    <div className="skeleton h-20 w-full max-w-lg"></div>
                    <div className="flex gap-2">
                        <div className="skeleton h-10 w-24"></div>
                        <div className="skeleton h-10 w-28"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <Swiper
                modules={[Autoplay]}
                navigation
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={sliderData.length > 2}
                // rewind={true}
                spaceBetween={30}
                slidesPerView={1}
                className="mySwiper"
            >
                {
                    sliderData.map((slider, index) =>

                        <SwiperSlide
                            key={index}
                            style={{
                                backgroundImage: `url(${slider.posterWideUrl})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                height: '82vh', // adjust as needed
                                position: 'relative',
                                color: 'white'
                            }}
                        >
                            {/* Overlay for better readability - full */}
                            <div className="absolute inset-0 bg-black/30"></div>

                            {/* Top overlay */}
                            <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-black/70 to-transparent"></div>

                            {/* Bottom overlay */}
                            <div className="absolute bottom-0 left-0 right-0 h-52 bg-linear-to-t from-black/90 to-transparent"></div>

                            {/* Slide content */}
                            <div className="relative z-10 flex flex-col justify-center items-start h-full px-10 gap-3 max-w-7xl mx-auto">
                                <h1 className="text-4xl font-bold">{slider.title}</h1>
                                <div className='flex flex-row felx-start gap-3'>
                                    <div className='btn btn-outline hover:btn-disabled cursor-default'>
                                        <FaStar className='text-yellow-500' />
                                        <span className=' text-xs font-medium text-yellow-500'>{slider.rating}</span>
                                    </div>
                                    <div className='btn btn-outline hover:btn-disabled cursor-default'>
                                        <span className=' text-xs font-medium text-white'>{slider.releaseYear}</span>
                                    </div>

                                    <div className='btn btn-outline hover:btn-disabled cursor-default'>
                                        <span className=' text-xs font-medium text-white'>{slider.genre}</span>
                                    </div>
                                </div>
                                <p className="mt-4 max-w-lg">{slider.plotSummary}</p>
                                <div className='flex gap-2'>
                                    <button 
                                        className='btn btn-dark dark:btn-outline'
                                        onClick={() => navigate(`/movies/${slider._id}`)}
                                    >
                                        <FaPlay />Play
                                    </button>
                                    <button 
                                        className='btn btn-outline'
                                        onClick={() => navigate(`/movies/${slider._id}`)}
                                    >
                                        <FiInfo />See More
                                    </button>
                                </div>
                            </div>
                        </SwiperSlide>

                    )
                }

            </Swiper>
        </>
    );
};

export default Hero;