import React from 'react';
import Hero from '../components/Home/Hero';
import Statistics from '../components/Home/Statistics';
import TopRatedMovies from '../components/Home/TopRatedMovies';
import RecentMovies from '../components/Home/RecentMovies';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <Statistics></Statistics>
            <TopRatedMovies></TopRatedMovies>
            <RecentMovies></RecentMovies>
        </div>
    );
};

export default Home;