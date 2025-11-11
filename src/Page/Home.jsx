import React from 'react';
import Hero from '../components/Home/Hero';
import Statistics from '../components/Home/Statistics';
import TopRatedMovies from '../components/Home/TopRatedMovies';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <Statistics></Statistics>
            <TopRatedMovies></TopRatedMovies>
        </div>
    );
};

export default Home;