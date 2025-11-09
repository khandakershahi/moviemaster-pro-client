import React from 'react';
import { createBrowserRouter } from 'react-router';
import MainLayout from '../Layout/MainLayout';
import Home from '../Page/Home';
import AllMovies from '../Page/AllMovies';
import MyCollection from '../Page/MyCollection';
import WatchList from '../Page/WatchList';


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
                    Component: AllMovies
                },
                {
                    path: '/my-collection',
                    Component: MyCollection
                },
                {
                    path: '/watchlist',
                    Component: WatchList
                }

            ]
        },
    ]);





export default router;