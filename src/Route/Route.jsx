import React from 'react';
import { createBrowserRouter } from 'react-router';
import MainLayout from '../Layout/MainLayout';
import Home from '../Page/Home';
import AllMovies from '../Page/AllMovies';
import MyCollection from '../Page/MyCollection';
import WatchList from '../Page/WatchList';
import Register from '../Page/Register';
import Login from '../Page/Login';
import Error404 from '../Page/Error404';
import Loading from '../components/Loading/Loading';
import MovieDetails from '../Page/MovieDetails';


const router = createBrowserRouter([
        {
            path: "/",
            Component: MainLayout,
            children: [
                {
                    index: true,
                    Component: Home,
                },
                {
                    path: '/all-movies',
                    Component: AllMovies,
                    
                },
                {
                    path: '/my-collection',
                    Component: MyCollection
                },
                {
                    path: '/watchlist',
                    Component: WatchList
                },
                {
                    path: '/register',
                    Component: Register
                },
                {
                    path: '/login',
                    Component: Login
                },
                {
                    path: '/movie-detials/:id',
                    Component: MovieDetails
                },
                {
                    path: '/*',
                    Component: Error404

                }

            ]
        },
    ]);





export default router;