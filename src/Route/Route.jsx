// src/router.jsx
import React from "react";
import { createBrowserRouter } from "react-router";

import Home from "../Page/Home";
import AllMovies from "../Page/AllMovies";
import MyCollection from "../Page/MyCollection";
import WatchList from "../Page/WatchList";
import Register from "../Page/Register";
import Login from "../Page/Login";
import Error404 from "../Page/Error404";
import MovieDetails from "../Page/MovieDetails";
import MovieAdd from "../Page/MovieAdd";
import PrivateRoute from "./PrivateRoute";
import MovieEdit from "../Page/MovieEdit";
import MainLayout from "../Layout/MainLayout";
import Search from "../Page/Search";
import PrivacyPage from "../Page/PrivacyPage";
import TermsPage from "../Page/TermsPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: "/movies", Component: AllMovies },
      {
        path: "/movies-my-collection",
        element: (
          <PrivateRoute>
            <MyCollection />
          </PrivateRoute>
        ),
      },
      {
        path: "/movies-watchlist",
        element: (
          <PrivateRoute>
            <WatchList></WatchList>
          </PrivateRoute>
        ),
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/movies/:id",
        Component: MovieDetails,
      },
      {
        path: "/movies-add",
        element: (
          <PrivateRoute>
            <MovieAdd />
          </PrivateRoute>
        ),
      },
      {
        path: "/movies-update/:id",
        element: (
          <PrivateRoute>
            <MovieEdit />
          </PrivateRoute>
        ),
      },
      {
        path: "/movies-search",
        Component: Search,
      },

      {
        path: "/*",
        Component: Error404,
      },
      {
        path: "/privacy",
        Component: PrivacyPage,
      },
      {
        path: "/terms",
        Component: TermsPage,
      },
    ],
  },
  { path: "*", Component: Error404 }, // Top-level 404
]);

export default router;
