import React from 'react';
import Hero from '../components/Home/Hero';
import Statistics from '../components/Home/Statistics';
import TopRatedMovies from '../components/Home/TopRatedMovies';
import RecentMovies from '../components/Home/RecentMovies';
import Genre from '../components/Home/Genre';
import MovieMasterPro from '../components/Home/MovieMasterPro';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <Statistics></Statistics>
            <TopRatedMovies></TopRatedMovies>
            <RecentMovies></RecentMovies>
            <Genre></Genre>
            <MovieMasterPro></MovieMasterPro>
        </div>
    );
};

export default Home;