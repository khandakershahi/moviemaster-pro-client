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
import About from "../Page/About";
import Contact from "../Page/Contact";
import DashboardLayout from "../Layout/DashboardLayout";
import DashboardHome from "../Page/DashboardHome";
import DashboardAddMovie from "../Page/Dashboard/AddMovie";
import DashboardWatchList from "../Page/Dashboard/WatchList";
import DashboardMyCollection from "../Page/Dashboard/MyCollection";
import DashboardMyReviews from "../Page/Dashboard/MyReviews";
import DashboardEditMovie from "../Page/Dashboard/EditMovie";
import DashboardProfile from "../Page/Dashboard/Profile";

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
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/contact",
        Component: Contact,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, Component: DashboardHome },
      { path: "add-movie", Component: DashboardAddMovie },
      { path: "watchlist", Component: DashboardWatchList },
      { path: "my-collection", Component: DashboardMyCollection },
      { path: "my-reviews", Component: DashboardMyReviews },
      { path: "profile", Component: DashboardProfile },
      { path: "edit/:id", Component: DashboardEditMovie },
    ],
  },
  { path: "*", Component: Error404 }, // Top-level 404
]);

export default router;
