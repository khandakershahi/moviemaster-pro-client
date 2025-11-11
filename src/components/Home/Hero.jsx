import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import axios from 'axios';
import { FaPlay, FaStar } from 'react-icons/fa';
import { FiInfo } from 'react-icons/fi';


const Hero = () => {

    const [sliderData, setSliderData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/movie-slider')
            .then(res => {
                console.log('slider data', res.data);
                setSliderData(res.data);
            })
    }, [])


    return (
        <>
            <Swiper
                modules={[Autoplay]}
                navigation
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={sliderData.length > 6}
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
                            <div className="absolute inset-0 bg-black/50"></div>

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
                                        <span className=' text-xs font-medium text-white'>{slider.rating}</span>
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
                                    <button className='btn btn-dark hover:btn-disabled cursor-default dark:btn-outline'><FaPlay />Play</button>
                                    <button className='btn btn-outline hover:btn-disabled cursor-default'><FiInfo />See More</button>
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