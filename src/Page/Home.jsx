import React from 'react';
import Hero from '../components/Home/Hero';
import Statistics from '../components/Home/Statistics';
import TopRatedMovies from '../components/Home/TopRatedMovies';
import RecentMovies from '../components/Home/RecentMovies';
import Genre from '../components/Home/Genre';
import MovieMasterPro from '../components/Home/MovieMasterPro';
import Faq from '../components/Home/Faq';
import Reviews from '../components/Home/Reviews';
import CTA from '../components/Home/CTA';
import Newsletter from '../components/Home/Newsletter';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <Statistics></Statistics>
            <TopRatedMovies></TopRatedMovies>
            <RecentMovies></RecentMovies>
            <Genre></Genre>
            <MovieMasterPro></MovieMasterPro>
            <Faq></Faq>
            <Reviews></Reviews>
            <CTA></CTA>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;